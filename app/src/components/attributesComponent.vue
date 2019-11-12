<template>
  <v-container fluid>
    <v-form ref="form" v-model="valid" @click.prevent="submit">
      <v-row class="mx-auto">
        <v-col cols="3">
          <v-select
            label="Dexterity"
            v-model="form.dexterity"
            :rules="[v => !!v || 'Item is required']"
            :items="items"
            required
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            label="Constitution"
            v-model="form.constitution"
            :items="items"
            :rules="[v => !!v || 'Item is required']"
            required
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            label="Winsdow"
            v-model="form.winsdow"
            :items="items"
            :rules="[v => !!v || 'Item is required']"
            required
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            label="Intelligence"
            v-model="form.intelligence"
            :items="items"
            :rules="[v => !!v || 'Item is required']"
            required
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            label="Charisma"
            :items="items"
            v-model="form.charisma"
            :rules="[v => !!v || 'Item is required']"
            required
          ></v-select>
        </v-col>
        <v-col cols="3" offset="1">
          {{form.options}}
          <v-radio-group v-model="form.options" :rules="[v => !!v || 'Item is required']" row>
            <v-radio value="rogue" label="Rogue"></v-radio>
            <v-radio value="mage" label="Mage"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" offset="5">
          <v-card-actions>
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn :disabled="!valid" v-on="on">Confirm</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Attributes</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Your dexterity"
                          :value="form.charisma"
                          readonly
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Your constitution"
                          :value="form.constitution"
                          readonly
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Your winsdow" :value="form.winsdow" readonly></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Your intelligence"
                          :value="form.intelligence"
                          readonly
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Your charisma"
                          :value="form.charisma"
                          readonly
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Your Kind" :value="form.options" readonly required></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                  <v-btn color="blue darken-1" text @click="getAttribute">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-btn text class="blue--text" @click="resetForm">Reset</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>


<script>
export default {
  name: "attributes",
  data: () => ({
    dialog: false,
    form: {
      charisma: "",
      intelligence: "",
      winsdow: "",
      constitution: "",
      dexterity: "",
      options: ""
    },

    valid: false,
    items: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20
    ]
  }),
  methods: {
    resetForm() {
      this.$refs.form.reset();
    },
    getAttribute() {
      this.dialog = false;
      this.$emit("emit-click-attribute", this.form);
    }
  }
};
</script>

<style scoped>
</style>