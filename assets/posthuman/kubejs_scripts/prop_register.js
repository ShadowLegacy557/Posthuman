const array = [
    'pyrokinesis',
    'wraith',
    'collection',
    'wings',
    'chaosmagic',
    "trailblazer",
    'magnetokinesis',
    'cryoforge'
]
const TIMER = 'posthuman.timer'
const STATSCOLOUR = 'posthuman.statsColour'
const CURRENTPOWER = 'posthuman.currentPower'
const pSlot1 = 'posthuman.pSlot1'
const pSlot2 = 'posthuman.pSlot2'
const pSlot3 = 'posthuman.pSlot3'
PalladiumEvents.registerPropertiesClientSided((event) => {
    if (event.getEntityType() === 'minecraft:player') {
        event.registerProperty(TIMER, 'integer', 0)
        array.forEach(power => {
            event.registerProperty(`posthuman.${power}Level`, 'integer', 1)
            event.registerProperty(`posthuman.${power}Mastery`, 'float', 0)
            event.registerProperty(`posthuman.${power}MasteryMax`, 'integer', 500)
            event.registerProperty(`posthuman.${power}Colour`, 'integer', 0)
        })
        event.registerProperty(STATSCOLOUR, 'integer', 0)
        event.registerProperty(CURRENTPOWER, 'integer', 0)
        event.registerProperty(pSlot1, 'string', 'empty')
        event.registerProperty(pSlot2, 'string', 'empty')
        event.registerProperty(pSlot3, 'string', 'empty')
        event.registerProperty('posthuman.selector', 'integer', 0)
        event.registerProperty('posthuman.readPower', 'string', 'empty')
    }
})