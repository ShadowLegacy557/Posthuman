EntityEvents.spawned(event => {
    let enabled = false
    let moblist = [
        'minecraft:zombie',
        'minecraft:skeleton',
        'minecraft:creeper',
        'minecraft:spider',
    ]
    let powerlist = []
    if (moblist.includes(event.entity.getType()) && enabled === true) {
        let num = Math.floor(Math.random() * 100) + 1
        if (num <= 5) {
            let power = powerlist[Math.floor(Math.random() * powerlist.length)]
            palladium.superpowers.addSuperpower(event.entity, power)
        }
    }
})