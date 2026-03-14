PlayerEvents.tick(event => {
    let player = event.player
    let weapons = [
        'posthuman:ice_sword',
        'posthuman:ice_battleaxe',
        'posthuman:ice_claws'
    ]
    weapons.forEach(weapon => {
        let slot = player.inventory.find(weapon)
        if (slot > -1) {
            for (let item of player.inventory.allItems) {
                if (item.id == weapon) {
                    let currentDur = item.getDamageValue()
                    if (0 < currentDur < 600) {
                        if (player.level.getDimension() != 'minecraft:the_nether') {
                            if (!palladium.superpowers.hasSuperpower(player, 'posthuman:cryoforge') && !palladium.superpowers.hasSuperpower(player, 'posthuman:pyrokinesis')) {
                                item.setDamageValue(currentDur + 1)

                            } else if (palladium.superpowers.hasSuperpower(player, 'posthuman:cryoforge')) {
                                item.setDamageValue(currentDur - 1)
                            } else if (palladium.superpowers.hasSuperpower(player, 'posthuman:pyrokinesis')) {
                                item.setDamageValue(currentDur + 2)
                            }
                        } else {
                            if (!palladium.superpowers.hasSuperpower(player, 'posthuman:cryoforge') && !palladium.superpowers.hasSuperpower(player, 'posthuman:pyrokinesis')) {
                                item.setDamageValue(currentDur + 2)
                            } else if (palladium.superpowers.hasSuperpower(player, 'posthuman:cryoforge')) {
                                item.setDamageValue(currentDur + 1)
                            } else if (palladium.superpowers.hasSuperpower(player, 'posthuman:pyrokinesis')) {
                                item.setDamageValue(currentDur + 4)
                            }
                        }
                    }
                    if (currentDur >= 600) {
                        player.inventory.setStackInSlot(slot, 'minecraft:air')
                    }
                }
            }
        }
    })
}) // Made by ShadowLegacy557