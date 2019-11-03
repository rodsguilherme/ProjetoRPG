<template>
  <stepper></stepper>
</template>

<script>
//import axios from "axios";
import stepper from "./stepper";
export default {
  components: { stepper },
  name: "card",
  data: () => ({
    message: null,
    active: null,
    model: null,
    id: null,
    races: [
      {
        id: 1,
        url:
          "../assets/static/eiland_orig.jpg",
        name: "Elf"
      },
      {
        id: 2,
        url:
          "https://www.sketchgoblin.co.nz/uploads/1/1/6/7/116709803/halion_orig.jpg",
        name: "Warrior"
      },
      {
        id: 3,
        url:
          "https://www.sketchgoblin.co.nz/uploads/1/1/6/7/116709803/quincy_orig.jpg",
        name: "Mage"
      },
      {
        id: 4,
        url:
          "https://www.sketchgoblin.co.nz/uploads/1/1/6/7/116709803/mistrider_orig.jpg",
        name: "Rogue"
      }
    ]
  }),
  methods: {
    raceSelected(id) {
      this.id = id;
      console.log(this.id);
    }
  },
  computed: {}
};
</script>


<style scoped>
</style>