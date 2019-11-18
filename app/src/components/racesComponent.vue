<template>
  <v-sheet class="mx-auto"  max-width="100%" mx-height="130%"  >
    <v-slide-group v-model="model" class="pa-4" mandatory show-arrows style="backgroundColor: #212121">
      <v-slide-item
        v-for="(race, i) in races"
        :key="i"
       
        v-slot:default="{ active, toggle }"
      >
        <v-card class="ma-4 blue--text text--darken-4 card" elevation="15" :id="race.id" height="38vh" width="15vw" @click="raceSelected(i)">
          <img :src="race.url" width="100%" height="100%" />
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>

</template>

<script>
export default {
  name: "racesComponent",
  data: () => ({
    model: null,
    idRace: null,
    nameRace: null,
    races: [
      {
        id: 1,
        url:
          "https://www.sketchgoblin.co.nz/uploads/1/1/6/7/116709803/outlander_orig.jpg",
        name: "Elf"
      },
      {
        id: 2,
        url:
          "https://www.sketchgoblin.co.nz/uploads/1/1/6/7/116709803/dimitri_orig.jpg",
        name: "Orc"
      },
      {
        id: 3,
        url:
          "https://www.sketchgoblin.co.nz/uploads/1/1/6/7/116709803/mistrider_orig.jpg",
        name: "Human"
      },
      {
        id: 5,
        url:
          "https://www.sketchgoblin.co.nz/uploads/1/1/6/7/116709803/eiland_orig.jpg",
        name: "Dwarf"
      },
      {
        id: 5,
        url:
          "https://www.sketchgoblin.co.nz/uploads/1/1/6/7/116709803/eiland_orig.jpg",
        name: "Dwarf"
      },
      {
        id: 6,
        url:
          "https://www.sketchgoblin.co.nz/uploads/1/1/6/7/116709803/eiland_orig.jpg",
        name: "Dwarf"
      },
      {
        id: 7,
        url:
          "https://www.sketchgoblin.co.nz/uploads/1/1/6/7/116709803/eiland_orig.jpg",
        name: "Dwarf"
      },
      {
        id: 8,
        url:
          "https://www.sketchgoblin.co.nz/uploads/1/1/6/7/116709803/eiland_orig.jpg",
        name: "Dwarf"
      }
    ]
  }),
  methods: {
    raceSelected(id) {
      this.idRace = id;
      this.$emit("emit-click", id);

    }
  }
};
</script> 

<style scoped>
.card img:hover{
  height: 38vh;
  width: 15vw;
  border: 8px solid #D1C4E9
}
</style>