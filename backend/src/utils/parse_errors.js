const parseErrorField = (field) => ({
  field: field.path,
  currentValue: field.value,
  message: field.message
})

module.exports = {
  parseErrorField
}
