import { PetType } from './types';

export const CAT_NAMES: Map<number, string> = new Map<number, string>([
    [1, 'Bella'],
    [2, 'Charlie'],
    [3, 'Molly'],
    [4, 'Coco'],
    [5, 'Ruby'],
    [6, 'Oscar'],
    [7, 'Lucy'],
    [8, 'Bailey'],
    [9, 'Milo'],
    [10, 'Daisy'],
    [11, 'Archie'],
    [12, 'Ollie'],
    [13, 'Rosie'],
    [14, 'Lola'],
    [15, 'Frankie'],
    [16, 'Roxy'],
    [17, 'Poppy'],
    [18, 'Luna'],
    [19, 'Jack'],
    [20, 'Millie'],
    [21, 'Teddy'],
    [22, 'Cooper'],
    [23, 'Bear'],
    [24, 'Rocky'],
    [25, 'Alfie'],
    [26, 'Hugo'],
    [27, 'Bonnie'],
    [28, 'Pepper'],
    [29, 'Lily'],
    [30, 'Tilly'],
    [31, 'Leo'],
    [32, 'Maggie'],
    [33, 'George'],
    [34, 'Mia'],
    [35, 'Marley'],
    [36, 'Harley'],
    [37, 'Chloe'],
    [38, 'Lulu'],
    [39, 'Missy'],
    [40, 'Jasper'],
    [41, 'Billy'],
    [42, 'Nala'],
    [43, 'Monty'],
    [44, 'Ziggy'],
    [45, 'Winston'],
    [46, 'Zeus'],
    [47, 'Zoe'],
    [48, 'Stella'],
    [49, 'Sasha'],
    [50, 'Rusty'],
    [51, 'Gus'],
    [52, 'Baxter'],
    [53, 'Dexter'],
    [54, 'Willow'],
    [55, 'Barney'],
    [56, 'Bruno'],
    [57, 'Penny'],
    [58, 'Honey'],
    [59, 'Milly'],
    [60, 'Murphy'],
    [61, 'Simba'],
    [62, 'Holly'],
    [63, 'Benji'],
    [64, 'Henry'],
    [65, 'Lilly'],
    [66, 'Pippa'],
    [67, 'Shadow'],
    [68, 'Sam'],
    [69, 'Lucky'],
    [70, 'Ellie'],
    [71, 'Duke'],
    [72, 'Jessie'],
    [73, 'Cookie'],
    [74, 'Harvey'],
    [75, 'Bruce'],
    [76, 'Jax'],
    [77, 'Rex'],
    [78, 'Louie'],
    [79, 'Jet'],
    [80, 'Banjo'],
    [81, 'Beau'],
    [82, 'Ella'],
    [83, 'Ralph'],
    [84, 'Loki'],
    [85, 'Lexi'],
    [86, 'Chester'],
    [87, 'Sophie'],
    [88, 'Chilli'],
    [89, 'Billie'],
    [90, 'Louis'],
    [91, 'Scout'],
    [92, 'Cleo'],
    [93, 'Purfect'],
    [94, 'Spot'],
    [95, 'Bolt'],
    [96, 'Julia'],
    [97, 'Ginger'],
    [98, 'Daisy'],
    [99, 'Amelia'],
    [100, 'Oliver'],
]);

export const DOG_NAMES: Map<number, string> = new Map<number, string>([
    [1, 'Bella'],
    [2, 'Charlie'],
    [3, 'Max'],
    [4, 'Molly'],
    [5, 'Coco'],
    [6, 'Buddy'],
    [7, 'Ruby'],
    [8, 'Oscar'],
    [9, 'Lucy'],
    [10, 'Bailey'],
    [11, 'Milo'],
    [12, 'Daisy'],
    [13, 'Archie'],
    [14, 'Ollie'],
    [15, 'Rosie'],
    [16, 'Lola'],
    [17, 'Frankie'],
    [18, 'Toby'],
    [19, 'Roxy'],
    [20, 'Poppy'],
    [21, 'Luna'],
    [22, 'Jack'],
    [23, 'Millie'],
    [24, 'Teddy'],
    [25, 'Harry'],
    [26, 'Cooper'],
    [27, 'Bear'],
    [28, 'Rocky'],
    [29, 'Alfie'],
    [30, 'Hugo'],
    [31, 'Bonnie'],
    [32, 'Pepper'],
    [33, 'Lily'],
    [34, 'Leo'],
    [35, 'Maggie'],
    [36, 'George'],
    [37, 'Mia'],
    [38, 'Marley'],
    [39, 'Harley'],
    [40, 'Chloe'],
    [41, 'Lulu'],
    [42, 'Jasper'],
    [43, 'Billy'],
    [44, 'Nala'],
    [45, 'Monty'],
    [46, 'Ziggy'],
    [47, 'Winston'],
    [48, 'Zeus'],
    [49, 'Zoe'],
    [50, 'Stella'],
    [51, 'Sasha'],
    [52, 'Rusty'],
    [53, 'Gus'],
    [54, 'Baxter'],
    [55, 'Dexter'],
    [56, 'Diesel'],
    [57, 'Willow'],
    [58, 'Barney'],
    [59, 'Bruno'],
    [60, 'Penny'],
    [61, 'Honey'],
    [62, 'Milly'],
    [63, 'Murphy'],
    [64, 'Holly'],
    [65, 'Benji'],
    [66, 'Henry'],
    [67, 'Lilly'],
    [68, 'Pippa'],
    [69, 'Shadow'],
    [70, 'Sam'],
    [71, 'Buster'],
    [72, 'Lucky'],
    [73, 'Ellie'],
    [74, 'Duke'],
    [75, 'Jessie'],
    [76, 'Cookie'],
    [77, 'Harvey'],
    [78, 'Bruce'],
    [79, 'Jax'],
    [80, 'Rex'],
    [81, 'Louie'],
    [82, 'Bentley'],
    [83, 'Jet'],
    [84, 'Banjo'],
    [85, 'Beau'],
    [86, 'Ella'],
    [87, 'Ralph'],
    [88, 'Loki'],
    [89, 'Lexi'],
    [90, 'Chester'],
    [91, 'Sophie'],
    [92, 'Billie'],
    [93, 'Louis'],
    [94, 'Charlie'],
    [95, 'Cleo'],
    [96, 'Spot'],
    [97, 'Harry'],
    [98, 'Bolt'],
    [99, 'Ein'],
    [100, 'Maddy'],
    [101, 'Percy'],
    [102, 'Love Machine'],
    [103, 'Zippy'],
]);

export const CRAB_NAMES: Map<number, string> = new Map<number, string>([
    [1, 'Ferris'],
    [2, 'Pinchy'],
    [3, 'Grabby'],
    [4, 'Big Red'],
    [5, 'Crabby'],
    [6, 'Buddy'],
    [7, 'Ruby Red'],
    [8, 'Oscar'],
    [9, 'Lucy'],
    [10, 'Bailey'],
    [11, 'Crabito'],
    [12, 'Percy'],
    [13, 'Rocky'],
]);

export const CLIPPY_NAMES: Map<number, string> = new Map<number, string>([
    [1, 'Clippy'],
    [2, 'Karl Klammer'],
    [3, 'Clippy Jr.'],
    [4, 'Molly'],
    [5, 'Coco'],
    [6, 'Buddy'],
    [7, 'Ruby'],
    [8, 'Oscar'],
    [9, 'Lucy'],
    [10, 'Bailey'],
]);

export const TOTORO_NAMES: Map<number, string> = new Map<number, string>([
    [1, 'Totoro'],
    [2, 'トトロ'],
    [3, 'Max'],
    [4, 'Molly'],
    [5, 'Coco'],
    [6, 'Buddy'],
    [7, 'Ruby'],
    [8, 'Oscar'],
    [9, 'Lucy'],
    [10, 'Bailey'],
    [11, 'Big fella'],
]);

export const SNAKE_NAMES: Map<number, string> = new Map<number, string>([
    [1, 'Sneaky'],
    [2, 'Mr Slippery'],
    [3, 'Hissy Elliott'],
    [4, 'Molly'],
    [5, 'Coco'],
    [6, 'Buddy'],
    [7, 'Ruby'],
    [8, 'Bailey'],
    [9, 'Max'],
]);

export const DUCK_NAMES: Map<number, string> = new Map<number, string>([
    [1, 'Quacky'],
    [2, 'Floaty'],
    [3, 'Duck'],
    [4, 'Molly'],
    [5, 'Sunshine'],
    [6, 'Buddy'],
    [7, 'Chirpy'],
    [8, 'Oscar'],
    [9, 'Lucy'],
    [10, 'Bailey'],
    [11, 'Beaky'],
    [12, 'Jemima'],
    [13, 'Peaches'],
    [14, 'Quackers'],
    [15, 'Jelly Beans'],
]);

export const ZAPPY_NAMES: Map<number, string> = new Map<number, string>([
    [1, 'Zappy'],
    [2, 'Zippy'],
    [3, 'Zappy Jr.'],
    [4, 'Zoppy'],
    [5, 'Zuppy'],
    [6, 'Zeppy'],
    [7, 'Big Z'],
    [8, 'Little z'],
    [9, 'The Flash'],
    [10, 'Thor'],
    [11, 'Electric Bolt'],
]);

export const ROCKY_NAMES: Map<number, string> = new Map<number, string>([
    [1, 'Rocky'],
    [2, 'The Rock'],
    [3, 'Quartzy'],
    [4, 'Rocky I'],
    [5, 'Rocky II'],
    [6, 'Rocky III'],
    [7, 'Pebbles Sr.'],
    [8, 'Big Granite'],
    [9, 'Boulder'],
    [10, 'Rockefeller'],
    [11, 'Pebble'],
    [12, 'Rocksanne'],
    [13, 'Rockstar'],
]);

export const COCKATIEL_NAMES: Map<number, string> = new Map<number, string>([
    [1, 'Cocktail'],
    [2, 'Pipsqueak'],
    [3, 'Sir Chirps a Lot'],
    [4, 'Nibbles'],
    [5, 'Lord of the Wings'],
    [6, 'Girl Nest Door'],
    [7, 'Wingman'],
    [8, 'Meryl Cheep'],
    [9, 'Jack Sparrow'],
    [10, 'Godfeather'],
    [11, 'Mickey'],
    [12, 'Baquack Obama'],
    [13, 'Dame Judi Finch'],
    [14, 'Kanye Nest'],
]);

export function randomName(type: PetType): string {
    var collection: Map<number, string>;

    switch (type) {
        case PetType.cat:
            collection = CAT_NAMES;
            break;
        case PetType.dog:
            collection = DOG_NAMES;
            break;
        case PetType.crab:
            collection = CRAB_NAMES;
            break;
        case PetType.clippy:
            collection = CLIPPY_NAMES;
            break;
        case PetType.totoro:
            collection = TOTORO_NAMES;
            break;
        case PetType.snake:
            collection = SNAKE_NAMES;
            break;
        case PetType.rubberduck:
            collection = DUCK_NAMES;
            break;
        case PetType.zappy:
            collection = ZAPPY_NAMES;
            break;
        case PetType.rocky:
            collection = ROCKY_NAMES;
            break;
        case PetType.cockatiel:
            collection = COCKATIEL_NAMES;
            break;
        default:
            collection = CAT_NAMES;
            break;
    }

    return (
        collection.get(Math.floor(Math.random() * collection.size) + 1) ??
        'Unknown'
    );
}
