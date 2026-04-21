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
let uuidList = [
    `aa930136-21c9-41a4-9dad-6c08a3bf8f8d`
]
PlayerEvents.tick(event => {
    let player = event.player;
    if (!palladium.superpowers.hasSuperpower(player, 'posthuman:stats')) {
        palladium.superpowers.addSuperpower(player, 'posthuman:stats')
    }
})
PlayerEvents.loggedIn(event => {
    let { player, server } = event
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
PlayerEvents.loggedIn(event => {
    let player = event.player
    let uuid = player.getUuid().toString().toLowerCase()
    let username = player.getGameProfile().getName()
    if (uuidList.includes(uuid)) {
        server.runCommandSilent(`title ${username} title WOW`)
    }
})