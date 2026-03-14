let superpowers = [
    'posthuman:pyrokinesis', // ovven
    'posthuman:magnetokinesis', // harvey
    'posthuman:umbrakinesis', // fsang
    'posthuman:cryoforge', // none
]
let physicals = [
    'posthuman:wraith', // storm
    'posthuman:trailblazer', // logan
    'posthuman:animalmimicry', // ampel
    'posthuman:elasticity', // basl
    'posthuman:reactiveevolution', // tom
    'posthuman:wings', // foi1y
    'posthuman:permeation', // codec
    'posthuman:visualpowermimicry', // rebel
    'posthuman:bodyarmour' // drich
]
let majiks = [
    'posthuman:chaosmagic', // devmon
    'posthuman:necromancy', // placki
    'posthuman:alchemy', // gideon
    'posthuman:summoningmagic' // khimsky
]
let manipulations = [
    'posthuman:collection', // me
    'posthuman:gravity', // waffle
    'posthuman:time', // bosa 
    'posthuman:space', // tach
    'posthuman:molecularfield', // petr
    'posthuman:size', // oliver
    'posthuman:soul' // ivy
]
let tech = [
    'posthuman:cybernetics', // lewis
    'posthuman:powerarmour' // iron
]
let allPowerList = superpowers.concat(physicals, majiks, manipulations, tech)
superpowers.forEach(p => {
    ItemEvents.rightClicked(p + '_syringe', event => {
        let player = event.entity
        if (palladium.getProperty(player, 'posthuman.pSlot0') == 'empty') {
            palladium.superpowers.addSuperpower(player, p)
            palladium.setProperty(player, 'posthuman.pSlot0', p.replace('posthuman:', ''))
            player.setMainHandItem('posthuman:empty_syringe')
        } else return
    })
})
ItemEvents.rightClicked('posthuman:empty_syringe', event => {
    let player = event.entity
    superpowers.forEach(p => {
        if (palladium.superpowers.hasSuperpower(player, p)) {
            palladium.superpowers.removeSuperpower(player, p)
            palladium.setProperty(player, 'posthuman.pSlot0', 'empty')
            player.setMainHandItem(p + '_syringe')
        } else return
    })
})
PlayerEvents.tick(event => {
    let player = event.entity
    let powerList = palladium.powers.getPowerIdsForNamespace(player, 'posthuman').toArray()
    allPowerList.forEach(power => {
        if (!powerList.includes(power)) {
            palladium.setProperty(player, 'posthuman.pSlot0', 'empty')
        }
    })
})
EntityEvents.hurt(event => {
    let entity = event.entity
    let powerList = palladium.powers.getPowerIdsForNamespace(entity, 'posthuman').toArray()
    allPowerList.forEach(power => {
        if (powerList.includes(power) && palladim.getProperty(entity, 'posthuman.pSlot0') == 'empty') {
            palladium.setProperty(entity, 'posthuman.pSlot0', power.replace('posthuman:', ''))
        }
    })
})