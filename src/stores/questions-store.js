import { defineStore } from 'pinia'

export const useQuestionsStore = defineStore('QuestionsStore', {
    state: () => {
        return {
            questions: [],
            currentQuestionIndex: 0,
            categories: [],
            selectedCategory: 0,
            difficulties: [
                { id: 0, name: 'Any Difficulty', query: ''},
                { id: 1, name: 'Easy', query: 'easy'},
                { id: 2, name: 'Medium', query: 'medium'},
                { id: 3, name: 'Hard', query: 'hard'},
            ],
            selectedDifficulty: '',
            rewards: ['100 $', '200 $', '300 $', '500 $', '1000 $', '2000 $', '4000 $', '8000 $', '16 000 $', '32 000$', '64 000 $', '125 000 $', '250 000 $', '500 000 $', '1 000 000 $'],
            wonMoney: '0 $'
        }
    },
    getters: {
      getCurrentQuestion() {
          return this.questions[this.currentQuestionIndex]
      }
    },
    actions: {
        async getData() {
            await fetch(`https://opentdb.com/api.php?amount=15&type=multiple&category=${this.selectedCategory ?? ''}&difficulty=${this.selectedDifficulty ?? ''}`)
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }

                    throw new Error('Didnt get response')
                })
                .then((data) => {
                    this.questions = data.results
                })
                .then(() => {
                    console.log('got data')
                })
                .catch((error) => console.log(error))
        },
        async getCategories() {
                await fetch('https://opentdb.com/api_category.php')
                    .then((response) => {
                        if (response.ok) {
                            return response.json()
                        }

                        throw new Error('Didnt get response')
                    })
                    .then((data) => {
                        this.categories = data.trivia_categories
                    })
                    .catch((error) => console.log(error))
        },
        shuffleArray(array) {
           return [...array.sort(() => 0.5 - Math.random())];
        },
        setCategory(payload) {
            this.selectedCategory = payload
        },
        setDifficulty(payload) {
            this.selectedDifficulty = payload
        },
        setWonAmount() {
            if (this.currentQuestionIndex >= 4 && this.currentQuestionIndex < 9) {
                return this.wonMoney = '1000$'
            }
            if (this.currentQuestionIndex >= 9 && this.currentQuestionIndex < 14) {
                return this.wonMoney = '32000$'
            }
            if(this.currentQuestionIndex === 14) {
                return this.wonMoney = '1 MILLION $'
            }
            return this.wonMoney
        }
    }
})