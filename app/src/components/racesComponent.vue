<template>
  <v-sheet class="mx-auto" elevation="8" max-width="100%" height="100%">
    <v-slide-group v-model="model" class="pa-4" mandatory show-arrows>
      <v-slide-item
        v-for="(race, i) in races"
        :key="i"
        :id="race.id"
        v-slot:default="{ active, toggle }"
      >
        <v-card class="ma-4" :color="blue" height="400" width="280" @click="raceSelected(i)">
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
    blue: "blue",
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
        name: "Warrior"
      },
      {
        id: 3,
        url:
          "https://www.sketchgoblin.co.nz/uploads/1/1/6/7/116709803/mistrider_orig.jpg",
        name: "Rogue"
      },
      {
        id: 4,
        url:
          "https://www.sketchgoblin.co.nz/uploads/1/1/6/7/116709803/eiland_orig.jpg",
        name: "Mage"
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