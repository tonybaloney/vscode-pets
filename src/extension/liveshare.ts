import * as vsls from "vsls";
import { PetSpecification } from "./specification";

const SERVICE_NAME = 'vscode-pets';
const LIST_PETS_REQUEST = 'listPets';
const ADD_PET_NOTIFICATION = 'petAdded';

interface IPetLiveShareCollection {
    listAllPets() : PetSpecification[];
    addPeer(peer: number, pets: PetSpecification[]): void;
    listAllPets(): PetSpecification[];
    dropPeer(peer: number): void;
}

class PetLiveShareCollection implements IPetLiveShareCollection {
    private pets: Map<number, PetSpecification[]>;

    constructor(){
        this.pets = new Map<number, PetSpecification[]>();
    }

    listAllPets(): PetSpecification[] {
        const allPets: PetSpecification[] = new Array();
        this.pets.forEach( (values) => {
            allPets.concat(values);
        });
        return allPets;
    }

    addPeer(peer: number, pets: PetSpecification[]): void {
        this.pets.set(peer, pets);
    }

    dropPeer(peer: number): void {
        this.pets.delete(peer);
    }

}

let servicePetsCollection: IPetLiveShareCollection;

export async function setupVsls(){
    const api = await vsls.getApi();

    if (api){
        api.onDidChangeSession(async (e: vsls.SessionChangeEvent) => {
            if (e.session.role === vsls.Role.Host) {
                // Ready to host
                const service = await api.shareService(SERVICE_NAME);
                if (!service) {
                    return;
                }
                servicePetsCollection = new PetLiveShareCollection();
                service?.onRequest(LIST_PETS_REQUEST, () => {
                    return servicePetsCollection.listAllPets();
                });
                service?.onNotify(ADD_PET_NOTIFICATION, (e) => {
                    // TODO : Get the collection

                    // Re-broadcast the notification to all other guests.
                    service?.notify(ADD_PET_NOTIFICATION, e);
                });
            } else if (e.session.role === vsls.Role.Guest) {
                // Joined a session
                // Get the pets for the session
                const sharedService = await api.getSharedService(SERVICE_NAME);

                if (!sharedService) {
                    return;
                }
                let sessionPets: PetSpecification[] = await sharedService?.request(LIST_PETS_REQUEST, []);

                sharedService.onNotify(ADD_PET_NOTIFICATION, async ({ peerNumber }: any) => {
                    // Ignore the notification if it originated with this user.
                    if (peerNumber === api.session.peerNumber) {
                        return;
                    }
                    sessionPets = await sharedService?.request(LIST_PETS_REQUEST, []);
                });
            }
        });
        api.onDidChangePeers(async (e: vsls.PeersChangeEvent) => {
            // Iterate e.added
            if (api.session.role === vsls.Role.Host){
                for (let i = 0; i < e.removed.length; i++){
                    servicePetsCollection.dropPeer(e.added[i].peerNumber);
                }
                // Get pets from added peers.
                
            }
        });
    }
}