import { States } from './states';

export interface ISequenceNode {
    state: States;
    possibleNextStates: States[];
}

export interface ISequenceTree {
    startingState: States;
    sequenceStates: ISequenceNode[];
}
