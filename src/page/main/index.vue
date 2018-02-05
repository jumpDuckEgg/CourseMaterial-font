<template>  
    <v-container>
        <v-layout row wrap>
             <v-flex  xs6 sm4 lg3 xl2  v-for="i in 10" :key="`6${i}`" mt-5 px-3>
                  <v-card hover to='/login' tile>
                    <v-card-media
                    class="white--text"
                    height="150px"     
                    src="../../static/material_background.png" 
                    >
                    <v-container fill-height fluid>
                        <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                            <span class="headline">Top 10 Australian beaches</span>
                        </v-flex>
                        </v-layout>
                    </v-container>
                    </v-card-media>
                    <v-card-title>
                    <div>
                            <span class="grey--text">Number 10</span><br>
                            <span>Whitehaven Beach</span><br>
                            <span>Whitsunday Island, Whitsunday Islands</span>
                        <!-- <span>我是总问阿大撒大啊实打实啊实打实打实打阿三大苏打阿三阿三</span> -->
                    </div>
                    </v-card-title>
                    <!-- <v-card-actions>
                    <v-btn flat color="orange">Share</v-btn>
                    <v-btn flat color="orange">Explore</v-btn>
                    </v-card-actions> -->
                </v-card>  
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  name: "mainCotent"
};
</script>

<style lang="scss">

</style>
