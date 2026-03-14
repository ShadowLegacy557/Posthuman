StartupEvents.registry('palladium:condition_serializer', (event) => {
    event.create('posthuman:clear_path')
        .addProperty('range', 'integer', 5, 'the range to check for a clear path')
        .test((entity, props) => {
            if (entity.isPlayer()) {
                let range = props.get('range')
                let entityPath = entity.raytrace(range).entity
                if (entityPath === null && entity.raytrace(range).block === null) return true
            }
        })
})