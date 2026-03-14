let superpowers = [
    'pyrokinesis', // ovven
    'magnetokinesis', // harvey
    'umbrakinesis', // fsang
    'cryokinesis', // none
]
let physicals = [
    'wraith', // storm
    'trailblazer', // logan
    'animalmimicry', // ampel
    'elasticity', // basl
    'reactiveevolution', // tom
    'wings', // foi1y
    'permeation', // codec
    'visualpowermimicry', // rebel
    'bodyarmour' // drich
]
let majiks = [
    'chaosmagic', // devmon
    'necromancy', // placki
    'alchemy', // gideon
    'summoningmagic' // khimsky
]
let manipulations = [
    'collection', // me
    'gravity', // waffle
    'time', // bosa 
    'space', // tach
    'molecularfield', // petr
    'size', // oliver
    'soul' // ivy
]
let tech = [
    'cybernetics', // lewis
    'powerarmour' // iron
]
let powerDna = [
    'pyrokinesis_dna',
    'magnetokinesis_dna',
    'umbrakinesis_dna',
    'cryokinesis_dna',
    'wraith_dna',
    'trailblazer_dna',
    'animalmimicry_dna',
    'elasticity_dna',
    'reactiveevolution_dna',
    'wings_dna',
    'permeation_dna',
    'visualpowermimicry_dna',
    'bodyarmour_dna',
    'collection_dna',
    'gravity_dna',
    'time_dna',
    'space_dna',
    'molecularfield_dna',
    'size_dna',
    'soul_dna'
]
let statRarity = [
    'pitiful',
    'frail',
    'weak',
    'regular',
    'fit',
    'strong',
    'supreme'
]

////////////////////////////////////

StartupEvents.registry('item', event => {
    event.create('posthuman:empty_syringe')
        .texture("layer0", "posthuman:items/syringes/empty_syringe")
        .maxStackSize(1)
})
StartupEvents.registry('item', event => {
    event.create('posthuman:pyrokinesis_syringe')
        .texture("layer0", "posthuman:items/syringes/pyrokinesis_syringe")
        .maxStackSize(1)
        .tooltip(Text.translatable("§oInject yourself with the power of Pyrokinesis").color(0xffb300))
        .formattedDisplayName(Text.translatable("§lPyrokinesis Syringe").color(0xff7b00))
})
StartupEvents.registry('item', event => {
    event.create('posthuman:magnetokinesis_syringe')
        .texture("layer0", "posthuman:items/syringes/magnetokinesis_syringe")
        .maxStackSize(1)
        .tooltip(Text.translatable('§oInject yourself with the power of Magnetokinesis').color(0x5f1316))
        .formattedDisplayName(Text.translatable('§lMagnetokinesis Syringe').color(0x89b7f8))
})
StartupEvents.registry('item', event => {
    event.create('posthuman:umbrakinesis_syringe')
        .texture("layer0", "posthuman:items/syringes/umbrakinesis_syringe")
        .maxStackSize(1)
        .tooltip(Text.translatable('§oInject yourself with the power of Umbrakinesis').color(0x19171f))
        .formattedDisplayName(Text.translatable('§lUmbrakinesis Syringe').color(0x32283d))
})
StartupEvents.registry('item', event => {
    event.create('posthuman:cryoforge_syringe')
        .texture("layer0", "posthuman:items/syringes/cryokinesis_syringe")
        .maxStackSize(1)
        .tooltip(Text.translatable('§oInject yourself with the power of Cryokinesis').color(0xa6f2ff))
        .formattedDisplayName(Text.translatable('§lCryokinesis Syringe').color(0x79dbff))
})

////////////////////////////////////

let powerList = [
    'posthuman:pyrokinesis',
    'posthuman:cryoforge',
    'posthuman:umbrakinesis',
    'posthuman:magnetokinesis'
]
let advancedPowerList = [
    'posthuman:wraith',
    'posthuman:trailblazer',
    'posthuman:animalmimicry',
    'posthuman:elasticity',
    'posthuman:reactiveevolution',
    'posthuman:wings',
    'posthuman:permeation',
    'posthuman:visualpowermimicry',
    'posthuman:bodyarmour'
].concat(powerList)
let perfectedPowerList = [
    'posthuman:collection',
    'posthuman:gravity',
    'posthuman:time',
    'posthuman:space',
    'posthuman:molecularfield',
    'posthuman:size',
    'posthuman:soul'
]
StartupEvents.registry('item', event => {
    event.create('posthuman:experimental_vial')
        .texture("layer0", "posthuman:items/syringes/experimental_vial")
        .maxStackSize(64)
        .formattedDisplayName(Text.translatable('§lExperimental Vial').color(0x6a0a0a))
        .tooltip(Text.translatable('§oA mysterious vial containing §kan unknown substance.').color(0xcb0101))
        .useAnimation('block')
        .useDuration(itemstack => 1)
        .use((level, player, hand) => true)
        .finishUsing((itemstack, level, entity) => {
            if (palladium.getProperty(entity, 'posthuman.pSlot0') == 'empty') {
                let rng = Math.random() * 100
                if (rng >= 70) {
                    let power = powerList[Math.floor(Math.random() * powerList.length)]
                    palladium.superpowers.addSuperpower(entity, power)
                    palladium.setProperty(entity, 'posthuman.pSlot0', power.replace('posthuman:', ''))
                }
                itemstack.shrink(1)
                return itemstack
            } else return itemstack
        })
})
StartupEvents.registry('item', event => {
    event.create('posthuman:improved_vial')
        .texture("layer0", "posthuman:items/syringes/improved_vial")
        .maxStackSize(64)
        .formattedDisplayName(Text.translatable('§lImproved Vial').color(0x55c43b))
        .tooltip(Text.translatable('§oA vial containing an improved version of the Experimental Substance.').color(0x6ceb4f))
        .useAnimation('block')
        .useDuration(itemstack => 1)
        .use((level, player, hand) => true)
        .finishUsing((itemstack, level, entity) => {
            if (palladium.getProperty(entity, 'posthuman.pSlot0') == 'empty') {
                let rng = Math.random() * 100
                if (rng >= 50) {
                    let power = advancedPowerList[Math.floor(Math.random() * advancedPowerList.length)]
                    palladium.superpowers.addSuperpower(entity, power)
                    palladium.setProperty(entity, 'posthuman.pSlot0', power.replace('posthuman:', ''))
                }
                itemstack.shrink(1)
                return itemstack
            } else return itemstack
        })
})
StartupEvents.registry('item', event => {
    event.create('posthuman:perfected_vial')
        .texture("layer0", "posthuman:items/syringes/perfected_vial")
        .maxStackSize(64)
        .formattedDisplayName(Text.translatable('§lPerfected Vial').color(0x218eff))
        .tooltip(Text.translatable('§oA vial containing a perfected version of the Experimental Substance.').color(0x4dbaff))
        .useAnimation('block')
        .useDuration(itemstack => 1)
        .use((level, player, hand) => true)
        .finishUsing((itemstack, level, entity) => {
            if (palladium.getProperty(entity, 'posthuman.pSlot0') == 'empty') {
                let rng = Math.random() * 100
                if (rng >= 80) {
                    let power = perfectedPowerList[Math.floor(Math.random() * perfectedPowerList.length)]
                    palladium.superpowers.addSuperpower(entity, power)
                    palladium.setProperty(entity, 'posthuman.pSlot0', power.replace('posthuman:', ''))
                }
                itemstack.shrink(1)
                return itemstack
            } else return itemstack
        })
})
StartupEvents.registry('item', event => {
    event.create('posthuman:catalyst_cluster')
        .texture("layer0", "posthuman:items/catalyst_cluster")
        .maxStackSize(64)
        .formattedDisplayName(Text.translatable('§lCatalyst Cluster').color(0xff0000))
        .tooltip(Text.translatable('§oA cluster used to brew a catalyst.').color(0x30ff00))
})

//////////////////////////////////////

let failedRoll = [
    'palladium:quartz_circuit',
    'palladium:raw_titanium',
    'palladium:redstone_flux_crystal',
    'palladium:vibranium_circuit',
    'palladium:lead_circuit',
    'posthuman:empty_syringe',
    'palladium:multiversal_extrapolator',
    'posthuman:catalyst_cluster'
]
StartupEvents.registry("item", event => {
    event.create("posthuman:briefcase")
        .rarity("epic")
        .texture("layer0", "posthuman:items/briefcase")
        .useAnimation("block")
        .useDuration(itemstack => 1)
        .use((level, player, hand) => true)
        .finishUsing((itemstack, level, entity) => {
            let rng = Math.random() * 100
            let popItem
            if (rng > 60) {
                popItem = 'posthuman:experimental_vial'
            } else if (60 > rng) {
                popItem = failedRoll[Math.floor(Math.random() * failedRoll.length)]
            }
            entity.block.down.popItemFromFace(popItem, "up")
            itemstack.shrink(1)
            return itemstack
        })
})

//////////////////////////////////

StartupEvents.registry('item', event => {
    event.create('posthuman:power_gene')
        .texture("layer0", "posthuman:items/power_dna")
        .tooltip(Text.translatable('§oDNA containing the genes for a superpowered ability.').color(0xdba4ff))
        .formattedDisplayName(Text.translatable('§oPower Genes').color(0xba68ee))
        .maxStackSize(1)
})
StartupEvents.registry('item', event => {
    event.create('posthuman:trait_gene')
        .texture("layer0", "posthuman:items/trait_dna")
        .tooltip(Text.translatable('§oDNA containing the genes for certain physical capabilities.').color(0xfff3ab))
        .formattedDisplayName(Text.translatable('§oTrait Genes').color(0xeedb68))
})

/////////////////////////////////////