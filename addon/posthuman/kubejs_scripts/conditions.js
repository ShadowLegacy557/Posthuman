StartupEvents.registry('palladium:condition_serializer', (event) => {
  event.create('posthuman:uuid')
    .addProperty("uuid", "string", "baac7ff2-d949-416c-a492-e4f9ab3ddc87", "UUID of the Player")
    .test((entity, props) => {
      let uuid = props.get("uuid");
      return entity.getUuid().toString().toLowerCase() === uuid
    })
}); //made by CodecReality
StartupEvents.registry('palladium:condition_serializer', (event) => {
  event.create('posthuman:string_property')
    .addProperty('property', 'string', 'posthuman.power', 'the property thats read')
    .addProperty('value', 'string', 'none', 'the value required for a true result')
    .test((entity, props) => {
      let prop = props.get('property')
      let val = props.get('value')
      if (palladium.getProperty(entity, prop) === val) {
        return true
      } else {
        return false
      }
    }
    )
}) // Made by ShadowLegacy557
StartupEvents.registry('palladium:condition_serializer', (event) => {
  event.create('posthuman:pdata_boolean')
    .addProperty('data', 'string', 'first_join', 'the persistent data boolean to check')
    .addProperty('value', 'boolean', true, 'the value required for a true result')
    .test((entity, props) => {
      let data = props.get('data')
      let val = props.get('value')
      if (entity.persistentData.getBoolean(data) === val) {
        return true
      } else {
        return false
      }
    })
})
StartupEvents.registry('palladium:condition_serializer', (event) => {
  event.create('posthuman:pdata_string')
    .addProperty('data', 'string', 'dataKey', 'the persistent data to check')
    .addProperty('value', 'string', 'dataValue', 'the value required for a true result')
    .test((entity, props) => {
      let data = props.get('data')
      let val = props.get('value')
      if (entity.persistentData.get(data) === val) {
        return true
      } else {
        return false
      }
    })
})
StartupEvents.registry('palladium:condition_serializer', (event) => {
  event.create('posthuman:pdata_number')
    .addProperty('data', 'string', 'dataKey', 'the persistent data to check')
    .addProperty('value', 'float', 0, 'the value required for a true result')
    .test((entity, props) => {
      let data = props.get('data')
      let val = props.get('value')
      if (entity.persistentData.get(data) === val) {
        return true
      } else {
        return false
      }
    })
}) // Made by ShadowLegacy557
StartupEvents.registry('palladium:condition_serializer', (event) => {
  event.create('posthuman:free_hand')
    .addProperty('hand', 'string', 'main', 'main or off')
    .test((entity, props) => {
      let hand = props.get('hand')
      let item
      if (hand != 'off') {
        item = entity.getMainHandItem()
      } else {
        item = entity.getOffHandItem()
      }
      if (item == null) return true
      else return false
    })
})