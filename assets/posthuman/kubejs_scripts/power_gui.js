let Minecraft = Java.loadClass("net.minecraft.client.Minecraft");
const RenderSystem = Java.loadClass("com.mojang.blaze3d.systems.RenderSystem");
PalladiumEvents.renderPowerScreen(event => {
    let entity = Minecraft.getInstance().player
    if (!entity) return;
    let height = event.screen.height / 2
    let width = event.screen.width / 2
    if (event.tab.toString().includes("posthuman:")) {
        let power = event.tab.toString().replace("posthuman:", "")
        let colour = palladium.getProperty(entity, `posthuman.${power}Colour`)
        let size = 257
        event.guiGraphics.blit(new ResourceLocation(`posthuman:textures/gui/power/${power}/hud${colour}.png` ),
            ((width) - 126), ((height) - 101), (0), (0), (size), (size), (size), (size));
    }
}) // Made by ShadowLegacy557

PalladiumEvents.renderPowerScreen(event => {
    let entity = Minecraft.getInstance().player
    if (!entity) return;
    let height = event.screen.height / 2
    let width = event.screen.width / 2
    if (event.tab.toString().includes("posthuman:")) {
        let power = event.tab.toString().replace("posthuman:", "")
        let colour = palladium.getProperty(entity, `posthuman.${power}Colour`)
        let size = 125
        event.guiGraphics.blit(new ResourceLocation(`posthuman:textures/gui/power/${power}/counter_${colour}.png` ),
            ((width) + 130), ((height) - 101), (0), (0), (size), (size), (size), (size));
    }
})