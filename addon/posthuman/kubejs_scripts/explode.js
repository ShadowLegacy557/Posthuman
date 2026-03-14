StartupEvents.registry('palladium:abilities', (event) => {
    event.create('posthuman:explosion')
        .icon(palladium.createItemIcon('palladium:vibranium_circuit'))
        .documentationDescription('Make you Explode')

        .addProperty('cause_fire', 'boolean', false, 'if the explosion create fire')
        .addProperty('radius', 'integer', 1, 'radius of the explosion')
        .addProperty('self_damage', 'integer', 1, 'the damage on yourself')
        .addProperty('range', 'integer', 0, 'the range to explode at (set 0 to be on player)')

        .tick((entity, entry, holder, enabled) => {
            if (enabled && entity.isPlayer()) {
                let causingfire = entry.getPropertyByName("cause_fire");
                let radius = entry.getPropertyByName("radius");
                let self_dmg = entry.getPropertyByName("self_damage");
                let range = entry.getPropertyByName('range')

                if (range > 0) {
                    let targetBlock = entity.rayTrace(range).block
                    let targetEntity = entity.rayTrace(range).entity
                    if (targetBlock === null && targetEntity === null) return
                    if (targetBlock !== null) {
                        let posX = targetBlock.x;
                        let posY = targetBlock.y;
                        let posZ = targetBlock.z;
                        let explosion = entity.level.createExplosion(posX, posY, posZ);

                        if (causingfire == true) {
                            explosion.causesFire(true)
                        } else {
                            explosion.causesFire(false)
                        }

                        explosion.strength(radius);
                        explosion.exploder(entity);
                        explosion.explosionMode('block');
                        entity.attack(self_dmg)

                        explosion.explode();
                    }
                    if (targetEntity !== null) {
                        let posX = targetEntity.x;
                        let posY = targetEntity.y;
                        let posZ = targetEntity.z;
                        let explosion = entity.level.createExplosion(posX, posY, posZ);

                        if (causingfire == true) {
                            explosion.causesFire(true)
                        } else {
                            explosion.causesFire(false)
                        }

                        explosion.strength(radius);
                        explosion.exploder(entity);
                        explosion.explosionMode('block');
                        entity.attack(self_dmg)

                        explosion.explode();
                    }
                } else {
                    let posX = entity.x;
                    let posY = entity.y;
                    let posZ = entity.z;
                    let explosion = entity.level.createExplosion(posX, posY, posZ);

                    if (causingfire == true) {
                        explosion.causesFire(true)
                    } else {
                        explosion.causesFire(false)
                    }

                    explosion.strength(radius);
                    explosion.exploder(entity);
                    explosion.explosionMode('block');
                    entity.attack(self_dmg)

                    explosion.explode();
                }
            }
        });
}); // Original by Springirljoc
// Edited by ShadowLegacy557