EntityEvents.hurt(event => {
    const sources = [
        'inFire',
        'onFire',
        'lava',
        'cactus'
    ]
    let { entity, source } = event;
    let damageType = source.getType().toString();
    if (!sources.includes(damageType)) {
        addToProperty(entity, 'damage_score', event.damage)
        let message = palladium.getProperty(entity, 'damage_score')
        entity.setStatusMessage(`§cDamage Score: ${message}`)
    }
})
EntityEvents.hurt(event => {
    let { entity, source } = event;
    let testing = true;
    let damageType = source.getType().toString();
    if (testing == true) {
        entity.setStatusMessage('§cDamage Type: ' + damageType)
    }
})

let powerList = [
    'pyrokinesis',
    'cryoforge'
]
EntityEvents.death(event => {
    let entity = event.entity
    let player = event.source.actual
    if (player.isPlayer() && entity.isMonster()) {
        powerList.forEach(power => {
            let mastery = `posthuman.${power}Mastery`
            let level = `posthuman.${power}Level`
            let maxMas = `posthuman.${power}Max`
            if (palladium.superpowers.hasSuperpower(player, `posthuman:${power}`)) {
                palladium.setProperty(player, mastery, palladium.getProperty(player, mastery) + 1)
                if (palladium.getProperty(player, mastery) == palladium.getProperty(player, maxMas) && palladium.getProperty(player, level) != 100) {
                    palladium.setProperty(player, level, palladium.getProperty(player, level) + 1)
                    palladium.setProperty(player, mastery, palladium.getProperty(player, mastery) - palladium.getProperty(player, maxMas))
                    palladium.setProperty(player, maxMas, palladium.getProperty(player, maxMas) + 25)
                    player.setStatusMessage(`§3Your ${power} Level has Increased to ${palladium.getProperty(player, level)}`)
                }
                if (palladium.getProperty(player, mastery) < 0) {
                    palladium.setProperty(player, mastery, 0)
                }
                if (palladium.getProperty(player, maxMas) < 25) {
                    palladium.setProperty(player, maxMas, 25)
                    palladium.setProperty(player, level, 1)
                }
            } else return
        })
    }
})

let namespace = 'minecraft'
let item = 'diamond_sword'

EntityEvents.death(event => {
    let entity = event.entity
    let player = event.source.actual
    if (player.isPlayer() && entity.isLivingEntity()) {
        let itemId = `${namespace}:${item}`
        let handItem = player.getMainHandItem()
        let levels = {
            1: 10,
            2: 25,
            3: 50,
            4: 75,
            5: 100
        }
        if (handItem == itemId) {
            let killCount = handItem.nbt?.killCount ?? 0
            let currentLevel = handItem.nbt?.weaponLevel ?? 0
            handItem.nbt?.killCount = killCount + 1
            let nextLevel = currentLevel + 1
            if (killCount >= levels.nextLevel) {
                handItem.nbt?.weaponLevel = nextLevel
            }
        } else return
    } else return
})