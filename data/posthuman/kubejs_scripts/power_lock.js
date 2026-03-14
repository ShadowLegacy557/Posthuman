PlayerEvents.tick((event) => {
    let player = event.player
    let powers = ['posthuman:water', 'posthuman:flame']
    let hasPower = powers.some(power => palladium.superpowers.hasSuperpower(player, power))
    let enabled = false // Set to true to enable the power lock, false to disable
    if (hasPower && enabled === true) {
        powers.forEach(power => {
            palladium.superpowers.removeSuperpower(player, power)
        })
    }
})