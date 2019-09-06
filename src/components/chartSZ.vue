<template>
    <div>
      <chartTest
        :learning-chapters="learningChapters"
        :sub-chapter-names="subChapterNames"
        :sub-chapter-finish-time="subChapterAccuracy"
        :sub-chapter-accuracy="subChapterAccuracy"
        :sub-chapter-questions="subChapterQuestions"
        :visible="visible"
      ></chartTest>
    </div>

</template>

<script>
  import chartTest from './chartTest'
    export default {
        name: "chartSZ",
      components:{chartTest},
      data(){
          return {
            subChapterFinishTime:[4],
            learningChapters:[3],
            subChapterAccuracy:[2,4,4],
            subChapterQuestions:[1,3,4],
            visible:true,
            subChapterNames:[5,2,2,2,2,2,2,22,2334,24,3,434,24,532,532,45,3254,3,453,45,2]
          }
      }
    }
</script>

<style scoped>

</style>
