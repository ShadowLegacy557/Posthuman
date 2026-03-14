ServerEvents.recipes(event => {
    event.shapeless(
        'posthuman:improved_vial',
        [
            'posthuman:experimental_vial',
            Item.of('minecraft:potion').withNBT({ Potion: 'posthuman:catalyst' })
        ]
    )
})
ServerEvents.recipes(event => {
    event.shapeless(
        'posthuman:perfected_vial',
        [
            'posthuman:improved_vial',
            'posthuman:improved_vial',
            'posthuman:improved_vial',
            'posthuman:improved_vial',
            'posthuman:improved_vial',
            'posthuman:improved_vial',
            'posthuman:improved_vial',
            'posthuman:improved_vial',
            Item.of('minecraft:potion').withNBT({ Potion: 'posthuman:catalyst' })
        ]
    )
})