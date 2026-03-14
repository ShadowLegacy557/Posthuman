StartupEvents.registry('palladium:abilities', (event) => {
    event.create('posthuman:raycast_teleport')
        .icon(palladium.createItemIcon('minecraft:ender_pearl'))
        .documentationDescription('Teleports the caster to where they are looking at')
        .addProperty('range', 'float', 16, 'Range')
        .addProperty('through', 'boolean', true, 'Whether the teleport can go through walls')
        .addProperty('max', 'integer', 1, 'the max thickness of the wall the teleport can go through (must make through true)')
        .tick((entity, entry, holder, enabled) => {
            if (!enabled) return;
            let range = entry.getPropertyByName('range');
            let through = entry.getPropertyByName('through');
            let max = entry.getPropertyByName('max');
            let maxArray = new Array(max).fill(val => {
                return 0 < val <= max;
            })
            let hit = entity.rayTrace(range);
            if (!hit) return;
            let x, y, z;
            let xDir, yDir, zDir;
            if (hit.entity) {
                let target = hit.entity;
                x = target.x;
                y = target.y;
                z = target.z;
            }
            else if (hit.block) {
                let tarX = hit.block.x;
                let tarY = hit.block.y;
                let tarZ = hit.block.z;
                let cX = entity.x;
                let cZ = entity.z;
                let cY = entity.y;
                function direction(initial, target) {
                    if (initial < target) {
                        return 'increase';
                    }
                    else if (initial > target) {
                        return 'decrease';
                    }
                    else return 'none';
                }
                xDir = direction(cX, tarX);
                zDir = direction(cZ, tarZ);
                yDir = direction(cY, tarY);
                if (xDir == 'increase') {
                    if (through == true) {
                        x = tarX + 1;
                    }
                    else {
                        x = tarX - 1;
                    }
                }
                if (xDir == 'decrease') {
                    if (through == true) {
                        x = tarX - 1;
                    }
                    else {
                        x = tarX + 1;
                    }
                }
                if (xDir == 'none') {
                    x = tarX;
                }
                if (zDir == 'increase') {
                    if (through == true) {
                        z = tarZ + 1;
                    }
                    else {
                        z = tarZ - 1;
                    }
                }
                if (zDir == 'decrease') {
                    if (through == true) {
                        z = tarZ - 1;
                    }
                    else {
                        z = tarZ + 1;
                    }
                }
                if (zDir == 'none') {
                    z = tarZ;
                }
                if (yDir == 'increase') {
                    if (through == true) {
                        y = tarY + 1;
                    }
                    else {
                        y = tarY - 1
                    }
                }
                if (yDir == 'decrease') {
                    if (through == true) {
                        y = tarY - 1
                    }
                    else {
                        y = tarY + 1
                    }
                }
                if (yDir == 'none') {
                    y = tarY
                }
            } else {
                return;
            }
            entity.teleportTo(x, y, z);
        });
}); // Original ability by StonedGoldfish
// Edited by ShadowLegacy557