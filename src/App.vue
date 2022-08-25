<template>
  <div>
    <transfer
      :data="data"
      right-title="已選擇手機型號"
    ></transfer>
  </div>
</template>

<script setup>
  const data = [
     {
      title: 'Samsung',
      data: [
        {
          id: 1,
          phone_name: 'Samsung Galaxy A33(5G)',
          disabled: false
        },
        {
          id: 2,
          phone_name: 'Samsung Galaxy A52s(5G)',
          disabled: true
        },
        {
          id: 3,
          phone_name: 'Samsung Galaxy A53(5G)',
          disabled: false
        }
      ]
    }, {
      title: 'Google',
      data: [
        {
          id: 5,
          phone_name: 'Pixel 5a',
          disabled: true
        },
        {
          id: 6,
          phone_name: 'Pixel 6',
          disabled: true
        },
        {
          id: 7,
          phone_name: 'Piexl pro',
          disabled: false
        },
        {
          id: 8,
          phone_name: 'Pixel 6a',
          disabled: false
        }
      ]
    }, {
      title: 'IPhone',
      data: [
        {
          id: 9,
          phone_name: '13 mini',
          disabled: false
        },
        {
          id: 10,
          phone_name: '13',
          disabled: false
        },
        {
          id: 11,
          phone_name: '13 Pro',
          disabled: false
        },
        {
          id: 12,
          phone_name: '13 Pro Max',
          disabled: true
        }
      ]
    }
  ]

</script>

<style scoped>
</style>
