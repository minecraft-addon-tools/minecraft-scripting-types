declare type ParticleEffect = MinecraftParticleEffect | string;

declare const enum MinecraftParticleEffect {
    /**
     * Beacon effects
     */
    MobSpellAmbient = "minecraft:mobspellambient",
    /**
     * Attacking a villager in a village
     */
    VillagerAngry = "minecraft:villagerangry",
    /**
     * Breaking blocks, sprinting, iron golems walking
     */
    BlockBreak = "minecraft:blockbreak",
    /**
     * Breaking armor stands, falling
     */
    BlockDust = "minecraft:blockdust",
    /**
     * Entities in water, guardian laser beams, fishing
     */
    Bubble = "minecraft:bubble",
    /**
     * After jumping into water while on fire
     */
    Evaporation = "minecraft:evaporation",
    /**
     * Critical hits, bows, evoker fangs
     */
    CriticalHit = "minecraft:crit",
    /**
     * 	An ender dragon's breath and dragon fireballs
     */
    DragonBreath = "minecraft:dragonbreath",
    /**
     * Dripping lava through blocks
     */
    DripLava = "minecraft:driplava",
    /**
     * 	Dripping water through blocks, wet sponges, leaves when raining
     */
    DripWater = "minecraft:dripwater",
    /**
     * Redstone ore, powered redstone dust, redstone torches, powered redstone repeaters
     */
    RedstoneDust = "minecraft:reddust",
    /**
     * Splash potions, lingering potions, bottles o' enchanting, evokers.
     */
    Spell = "minecraft:spell",
    /**
     * Elder Gardians
     * note: wiki has a question mark
     */
    MobAppearance = "minecraft:mobappearance",
    /**
     * From bookshelves near an enchanting table.
     */
    EnchantingTable = "minecraft:enchantingtable",
    /**
     * End rods, shulker bullets.
     */
    EndRod = "minecraft:endrod",
    /**
     * 	Status effects, lingering potions, tipped arrows, trading, withered armor (linger potion particles decrease when the "minimal" particle setting is used).
     */
    MobSpell = "minecraft:mobspell",
    /**
     * Explosions, ghast fireballs, wither skulls, ender dragon death, shearing mooshrooms.
     */
    LargeExplosion = "minecraft:largeexplode",
    /**
     * Floating sand, gravel, concrete powder, and anvils.
     */
    FallingDust = "minecraft:fallingdust",
    /**
     * Firework rocket trail and explosion (trail is not shown when the "minimal" particle setting is used), when dolphins track shipwrecks and underwater ruins.
     */
    FireworksSpark = "minecraft:fireworksspark",
    /**
     * Fishing
     */
    WaterWake = "minecraft:waterwake",
    /**
     * 	Torches, furnaces, magma cubes, spawners.
     */
    Flame = "minecraft:flame",
    /**
     * 	Bone mealing a crop, trading with villagers, feeding baby animals, walking or jumping on turtle eggs.
     */
    VillagerHappy = "minecraft:villagerhappy",
    /**
     * Breeding and taming animals.
     */
    Heart = "minecraft:heart",
    /**
     * Explosions, ender dragon death.
     */
    HugeExplosion = "minecraft:hugeexplosion",
    /**
     * Instant health/damage splash and lingering potions, spectral arrows.
     */
    MobSpellInstantaneous = "minecraft:mobspellinstantaneous",
    /**
     * 	Eating, thrown eggs, splash potions, eyes of ender, breaking tools.
     */
    IconCrack = "minecraft:iconcrack",
    /**
     * Jumping slimes.
     */
    Slime = "minecraft:slime",
    /**
     * Thrown snowballs, creating withers, creating iron golems.
     */
    SnowballPoof = "minecraft:snowballpoof",
    /**
     * Fire, minecart with furnace, blazes, water flowing into lava, lava flowing into water.
     */
    LargeSmoke = "minecraft:largesmoke",
    /**
     * Lava
     */
    Lava = "minecraft:lava",
    /**
     * Burning entities, blazes for example.
     */
    MobFlame = "minecraft:mobflame",
    /**
     * Mycelium blocks.
     */
    TownAura = "minecraft:townaura",
    /**
     * Activated Conduits.
     */
    Nautilus = "minecraft:nautilus",
    /**
     * Emitted from note blocks and jukeboxes
     */
    Note = "minecraft:note",
    /**
     * Explosions, death of mobs, mobs spawned from a spawner, silverfish infesting blocks.
     */
    Explode = "minecraft:explode",
    /**
     * 	Nether portals, endermen, endermites, ender pearls, eyes of ender, ender chests, dragon eggs, teleporting from eating chorus fruits, end gateway portals.
     */
    Portal = "minecraft:portal",
    /**
     * Rain
     */
    RainSplash = "minecraft:rainsplash",
    /**
     * 	Torches, primed TNT, droppers, dispensers, end portals, brewing stands, spawners, furnaces, ghast fireballs, wither skulls, taming, withers, lava (when raining), placing an eye of ender in an end portal frame, redstone torches burning out.
     */
    Smoke = "minecraft:smoke",
    /**
     * Entities in water, wolves shaking off after swimming, boats.
     */
    WaterSplash = "minecraft:watersplash",
    /**
     * Produced by squids when attacked
     */
    Ink = "minecraft:ink",
    /**
     * ?
     */
    Terrain = "minecraft:terrain",
    /**
     * Activated totem of undying.
     */
    Totem = "minecraft:totem",
    /**
     * ?
     */
    TrackingEmitter = "minecraft:trackingemitter",
    /**
     * Witches.
     */
    WitchSpell = "minecraft:witchspell"
}