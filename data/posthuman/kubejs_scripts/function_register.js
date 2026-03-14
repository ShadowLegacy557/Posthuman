const $ServerPlayer = Java.loadClass("net.minecraft.server.level.ServerPlayer");
const $Holder = Java.loadClass("net.minecraft.core.Holder");
const $Property = Java.loadClass("net.threetag.palladium.util.property.PalladiumProperty")
const $PropertyLookup = Java.loadClass("net.threetag.palladium.util.property.PalladiumPropertyLookup")

/**
@param {Internal.Player} player
@param {string} property
@param {integer} amount
*/
function addToProperty(player, property, amount) {
    if (player instanceof $ServerPlayer) {
        let prop = palladium.getProperty(player, property)
        if (property != null) {
            return palladium.setProperty(player, property, prop + amount)
        } else return
    }
}