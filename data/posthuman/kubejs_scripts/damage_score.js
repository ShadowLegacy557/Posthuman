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