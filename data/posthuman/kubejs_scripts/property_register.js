let powers = [
    'pyrokinesis',
    'wraith',
    'collection',
    'wings',
    'chaosmagic',
    "trailblazer",
    'magnetokinesis',
    'umbrakinesis',
    'cryoforge'
]
let stats = [
    'strength',
    'health',
    'mana',
    'stamina'
]
let collection = [
    'posthuman.pSlot',
    'posthuman.gSlot'
]
let collectionSELECTOR = 'posthuman.selector'
let STATCOLOUR = 'posthuman.statsColour'
PalladiumEvents.registerProperties((event) => {
    powers.forEach(power => {
        event.registerProperty(`posthuman.${power}Level`, 'integer', 0)
        event.registerProperty(`posthuman.${power}Mastery`, 'float', 0)
        event.registerProperty(`posthuman.${power}Max`, 'integer', 25)
        event.registerProperty(`posthuman.${power}Colour`, 'integer', 0)
    })
    stats.forEach(stat => {
        event.registerProperty(`posthuman.${stat}Training`, 'float', 0)
        event.registerProperty(`posthuman.${stat}Level`, 'integer', 1)
        event.registerProperty(`posthuman.${stat}Max`, 'integer', 100)
    })
    collection.forEach(collect => {
        event.registerProperty(collect + '0', 'string', 'empty')
        event.registerProperty(collect + '1', 'string', 'empty')
        event.registerProperty(collect + '2', 'string', 'empty')
        event.registerProperty(collect + '3', 'string', 'empty')
    })
    event.registerProperty(collectionSELECTOR, 'integer', 0)
    event.registerProperty(STATCOLOUR, 'integer', 0)
    event.registerProperty('posthuman.currentPower', 'integer', 0)
    event.registerProperty('posthuman.speedLevel', 'integer', 0)
    event.registerProperty('posthuman.ringSlot', 'string', 'empty')
    event.registerProperty('posthuman.readPower', 'string', 'empty')
})