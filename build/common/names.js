"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomName = void 0;
const cat_1 = require("../panel/pets/cat");
const chicken_1 = require("../panel/pets/chicken");
const clippy_1 = require("../panel/pets/clippy");
const cockatiel_1 = require("../panel/pets/cockatiel");
const crab_1 = require("../panel/pets/crab");
const dog_1 = require("../panel/pets/dog");
const fox_1 = require("../panel/pets/fox");
const mod_1 = require("../panel/pets/mod");
const rocky_1 = require("../panel/pets/rocky");
const rubberduck_1 = require("../panel/pets/rubberduck");
const snake_1 = require("../panel/pets/snake");
const totoro_1 = require("../panel/pets/totoro");
const zappy_1 = require("../panel/pets/zappy");
const rat_1 = require("../panel/pets/rat");
const turtle_1 = require("../panel/pets/turtle");
function randomName(type) {
    const collection = {
        ["cat" /* PetType.cat */]: cat_1.CAT_NAMES,
        ["chicken" /* PetType.chicken */]: chicken_1.CHICKEN_NAMES,
        ["dog" /* PetType.dog */]: dog_1.DOG_NAMES,
        ["fox" /* PetType.fox */]: fox_1.FOX_NAMES,
        ["crab" /* PetType.crab */]: crab_1.CRAB_NAMES,
        ["clippy" /* PetType.clippy */]: clippy_1.CLIPPY_NAMES,
        ["mod" /* PetType.mod */]: mod_1.MOD_NAMES,
        ["totoro" /* PetType.totoro */]: totoro_1.TOTORO_NAMES,
        ["snake" /* PetType.snake */]: snake_1.SNAKE_NAMES,
        ["rubber-duck" /* PetType.rubberduck */]: rubberduck_1.DUCK_NAMES,
        ["zappy" /* PetType.zappy */]: zappy_1.ZAPPY_NAMES,
        ["rocky" /* PetType.rocky */]: rocky_1.ROCKY_NAMES,
        ["cockatiel" /* PetType.cockatiel */]: cockatiel_1.COCKATIEL_NAMES,
        ["rat" /* PetType.rat */]: rat_1.RAT_NAMES,
        ["turtle" /* PetType.turtle */]: turtle_1.TURTLE_NAMES,
    }[type] ?? cat_1.CAT_NAMES;
    return (collection[Math.floor(Math.random() * collection.length)] ?? 'Unknown');
}
exports.randomName = randomName;
//# sourceMappingURL=names.js.map