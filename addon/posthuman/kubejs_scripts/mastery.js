StartupEvents.registry('palladium:abilities', (event) => {
    event.create('posthuman:mastery_prop')
        .addProperty('mastery', 'string', 'posthuman.flameMastery', 'the name of the mastery property')
        .addProperty('level', 'string', 'posthuman.flameLevel', 'the name of the level property')
        .addProperty('max', 'string', 'posthuman.flameMax', 'the name of the max property')
        .addProperty('amount', 'integer', 100, 'amount to add for the first level increase')
        .addProperty('modifier', 'float', 1.5, 'multiplier for each subsequent level')
        .addProperty('max_level', 'integer', 100, 'the maximum level attainable')
        .addProperty('colour', 'integer', 6, 'the colour of the level up message. Refer to Minecraft formatting codes')
        .tick((entity, entry, holder, enabled) => {
            if (enabled && entity.isPlayer()) {
                const mastery = entry.getPropertyByName('mastery')
                const level = entry.getPropertyByName('level')
                const max = entry.getPropertyByName('max')
                let amount = entry.getPropertyByName('amount')
                let modifier = entry.getPropertyByName('modifier')
                let max_level = entry.getPropertyByName('max_level')
                let currentLevel = palladium.getProperty(entity, level)
                let currentMax = palladium.getProperty(entity, max)
                let currentMastery = palladium.getProperty(entity, mastery)
                let colour = entry.getPropertyByName('colour')
                if (currentLevel < max_level && currentMastery >= currentMax) {
                    palladium.setProperty(entity, level, currentLevel + 1)
                    palladium.setProperty(entity, mastery, currentMastery - currentMax)
                    palladium.setProperty(entity, max, currentMax + (modifier * amount * currentLevel))
                    let newLevel = palladium.getProperty(entity, level)
                    let masteryTextInitial = mastery.replace('posthuman.', '')
                    let masteryTextSecond = masteryTextInitial.replace('Mastery', '')
                    let masteryText = `${masteryTextSecond.slice(0, 1).toUpperCase()}${masteryTextSecond.slice(1)}`
                    entity.setStatusMessage('§' + colour + 'Your ' + masteryText + ' Mastery has increased to level ' + newLevel + '!')
                } else return
            }
        })
}) // Made by ShadowLegacy557
// Thanks to Codecreality for line 27
// Thanks to Lucas Lucraft for line 28
StartupEvents.registry('palladium:abilities', (event) => {
    event.create('posthuman:mastery_gain_prop')
        .addProperty('prop', 'string', 'posthuman.flameMastery', 'the name of the mastery property')
        .addProperty('amount', 'integer', 1, 'amount to adjust by')
        .addProperty('power', 'string', 'flame', 'the name of the power to check for affinity tags')
        .addProperty('pos_mult', 'float', 1.5, 'multiplier if positive tag is present')
        .addProperty('neg_mult', 'float', 2, 'multiplier if negative tag is present')
        .addProperty('lvl_mult', 'float', 0.1, 'multiplier based on current level')
        .addProperty('forgiveness', 'string', 'nice', 'nice = increase exp gain for higher levels, hard = decrease exp gain for higher levels')
        .tick((entity, entry, holder, enabled) => {
            if (enabled && entity.isPlayer()) {
                let prop = entry.getPropertyByName('prop')
                let power = entry.getPropertyByName('power')
                let forgiveness = entry.getPropertyByName('forgiveness')
                let lvlMult = entry.getPropertyByName('lvl_mult') * palladium.getProperty(entity, ('posthuman.' + power + 'Level'))
                let hardAmount = entry.getPropertyByName('amount') * lvlMult
                let niceAmount = entry.getPropertyByName('amount') + hardAmount
                let pos_tag = ('posthuman.' + power + 'PosAffinity')
                let neg_tag = ('posthuman.' + power + 'NegAffinity')
                let pos_mult = entry.getPropertyByName('pos_mult')
                let neg_mult = entry.getPropertyByName('neg_mult')
                if (!entity.tags.contains(pos_tag) && !entity.tags.contains(neg_tag)) {
                    if (forgiveness === 'nice') {
                        palladium.setProperty(entity, prop, palladium.getProperty(entity, prop) + niceAmount)
                    } else {
                        palladium.setProperty(entity, prop, palladium.getProperty(entity, prop) + hardAmount)
                    }
                }
                else if (entity.tags.contains(pos_tag)) {
                    if (forgiveness === 'nice') {
                        palladium.setProperty(entity, prop, palladium.getProperty(entity, prop) + (niceAmount * pos_mult))
                    } else {
                        palladium.setProperty(entity, prop, palladium.getProperty(entity, prop) + (hardAmount * pos_mult))
                    }
                }
                else if (entity.tags.contains(neg_tag)) {
                    if (forgiveness === 'nice') {
                        palladium.setProperty(entity, prop, palladium.getProperty(entity, prop) + (niceAmount * neg_mult))
                    } else {
                        palladium.setProperty(entity, prop, palladium.getProperty(entity, prop) + (hardAmount * neg_mult))
                    }
                }
            }
        })
})