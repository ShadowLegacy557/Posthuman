let superpowers = [
    'pyrokinesis',
    'magnetokinesis',
    'umbrakinesis',
    'cryoforge'
]
let physical = [
    'wraith',
    'wings'
]
PlayerEvents.tick(event => {
    let player = event.player;
    if (!palladium.superpowers.hasSuperpower(player, 'posthuman:stats')) {
        palladium.superpowers.addSuperpower(player, 'posthuman:stats')
    }
})
PlayerEvents.loggedIn(event => {
    const { player, server } = event
    if (!player.persistentData.getBoolean("first_join")) {
        player.persistentData.putBoolean("first_join", true)
        let number = Math.floor(Math.random() * (100 - 1 + 1) + 1)
        if (number > 98) {
            let power = (physical[Math.floor(Math.random() * physical.length)])
            palladium.superpowers.addSuperpower(player, 'posthuman:' + power)
            player.setStatusMessage('§aYou are born as a Post Human. Your power is ' + power)
        }
        else if (98 > number > 90) {
            let power = (superpowers[Math.floor(Math.random() * superpowers.length)])
            let tag = 'posthuman.' + power + 'Body'
            player.tags.add(tag)
            player.setStatusMessage('§aYou are born with a natural potential to manifest ' + power + ', without negative side effects.')
        }
    }
})