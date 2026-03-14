const $BuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries');
const $Items = Java.loadClass('net.minecraft.world.item.Items');

const recipes = [
    { input: 'minecraft:awkward', ingredient: 'posthuman:catalyst_cluster', output: 'posthuman:catalyst' }
];

StartupEvents.postInit(event => {
    try {
        let classLoader = $Items.APPLE.getClass().getClassLoader();
        let $PotionBrewing = classLoader.loadClass('net.minecraft.world.item.alchemy.PotionBrewing');
        let $Potion = classLoader.loadClass('net.minecraft.world.item.alchemy.Potion');
        let $Item = classLoader.loadClass('net.minecraft.world.item.Item');
        let declaredMethods = $PotionBrewing.getDeclaredMethods();
        let targetMethod = null;

        for (let i = 0; i < declaredMethods.length; i++) {
            let params = declaredMethods[i].getParameterTypes();
            if (params.length === 3 && params[0].equals($Potion) && params[1].equals($Item) && params[2].equals($Potion)) {
                targetMethod = declaredMethods[i];
                break;
            }
        }

        if (targetMethod !== null) {
            targetMethod.setAccessible(true);
            recipes.forEach(brew => {
                let inputPotion = $BuiltInRegistries.POTION.get(new ResourceLocation(brew.input));
                let ingredientItem = $BuiltInRegistries.ITEM.get(new ResourceLocation(brew.ingredient));
                let outputPotion = $BuiltInRegistries.POTION.get(new ResourceLocation(brew.output));

                targetMethod.invoke(null, inputPotion, ingredientItem, outputPotion);
            });
        }
    } catch (e) { }
});

let $PotionBuilder = Java.loadClass('dev.latvian.mods.kubejs.misc.PotionBuilder');
function potionRegister(event, id, potion, durationInSeconds, amplifier) {
    event.createCustom(potion, () => {
        return new $PotionBuilder(potion)
            .effect(`${id}`, durationInSeconds * 20, amplifier)
            .createObject()
    });
}

StartupEvents.registry('potion', event => {
    potionRegister(event, 'posthuman:stamina', 'posthuman:catalyst', 30, 0);
});


// Absolutely MASSIVE shoutout to Codecreality for everything above this, Check out Omni-Souls (OMS) on Youtube rn, or i'll stab you for lurking in my files