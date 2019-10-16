import React, { Component } from "react";

import Films from './Films.jsx'
import Bookmarks from './Bookmarks.jsx'
import Search from './Search.jsx'
import FilmCard from './FilmCard.jsx'

import '../../styles/sass/style.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_tab : "films", // текущий выбранный Таб
            tags : [], // массив всех тегов
            current_film : null, // текущий фильм
            films : [], // массив всех фильмов
            filteredItems : [], // массив отфильтрованных фильмов (и по тегам, и по поиску)
            tag : "",
            query : "", // поисковый запрос
            current_tags : {}, // текущие выбранные теги
            star1_path : "",
            bookmarks : (localStorage.getItem('bookmarks__list')) ?
                JSON.parse(localStorage.getItem('bookmarks__list')) : {}, // закладки
        };

        this.onChangeTab = this.onChangeTab.bind(this);
        this.reset = this.reset.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onFilterTags = this.onFilterTags.bind(this);
        this.resetCurrentFilm = this.resetCurrentFilm.bind(this);
        this.setFilm = this.setFilm.bind(this);
        this.getFilm = this.getFilm.bind(this);
        this.onAddBookmarks = this.onAddBookmarks.bind(this);
    }

    resetCurrentFilm(event){
        event.preventDefault();
        this.setState({
            current_film : null
        });
    }

    /* Обработка клика по разделам Фильмы/Закладки */
    onChangeTab(event) {
        const data = event.target.getAttribute('data-info');
        let current_tab = data;
        this.setState({
            current_tab : data,
        }, function () {
        })
    }


    /* Обработка поисковых запросов */
    onInputChange(event) {
        event.preventDefault();
        const query = document.getElementById("searchTxt").value;

        this.setState({
            query : query
        }, function () {
            this.filterItems();
        });

    }

    /* Обработка клика по тегам */
    onFilterTags(event) {
        let current_tags = {};
        const tag = event.target.getAttribute('name');
        let currentTag = this.state.current_tags[tag];

        if(currentTag == true) {
            delete this.state.current_tags[tag];
        } else {
            this.state.current_tags[tag] = true;
        }

        this.setState({
            current_tags : this.state.current_tags
        }, function () {
            this.filterItems();
        });
    }


    /* Функция фильтрации по тегам и поиску */
    filterItems(){
        let temp_films = [];
        let keys = Object.keys(this.state.current_tags);

        if (keys.length != 0) {

            for (let i = 0; i < this.state.films.length; i++) {

                for (let j = 0; j < this.state.films[i].tags.length; j++) {
                    let tagElem = this.state.films[i].tags[j];

                    for (let tag in this.state.current_tags) {
                        if (this.state.current_tags.hasOwnProperty(tagElem) && !(temp_films.includes(this.state.films[i]))) {
                            temp_films.push(this.state.films[i]);
                        }
                    }
                }
            }

        } else {
            temp_films = this.state.films;
        }

        if (this.state.query !== "") {
            temp_films = temp_films.filter(elem => {
                return elem.title.toLowerCase().includes(this.state.query.toLowerCase());
            });
        }

        this.setState({
            filteredItems : temp_films,
        })

    };

    /* добавление фильмов в список закладок */
    onAddBookmarks (event) {
        let filmTitle = event.target.title;

        if (filmTitle in this.state.bookmarks) {
            delete this.state.bookmarks[filmTitle];

        } else {
            this.state.bookmarks[filmTitle] = filmTitle;
        }

        this.setState({
            bookmarks : this.state.bookmarks,
        });

        localStorage.setItem('bookmarks__list', JSON.stringify(this.state.bookmarks));

    }

    reset(){
        this.setState({
            query : "",
            current_tags : {},
            filteredItems : this.state.films,
        });
        document.getElementById("searchTxt").value = "";
    }

    setFilm(event){
        event.preventDefault();

        const title = event.target.getAttribute("data-film-id");
        const film = this.getFilm(title);
        this.setState({
            current_film : film
        });

    }

    getFilm(title){
        for (let i = 0; i < this.state.films.length; i++) {
            if (this.state.films[i].title === title) {
                return this.state.films[i];
            }
        }
    }

    componentDidMount() {

        const films = "dist/data/films.json";
        const tags = "dist/data/tags.json";

        fetch(films)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    films : json,
                    filteredItems : json,

                });

            })
            .catch(() => console.log("Cant access " + films + " response. "));

        fetch(tags) //
            .then(response => response.json())
            .then(json => {
                this.setState({
                    tags : json,
                });

            })
            .catch(() => console.log("Cant access " + tags + " response. "));
    }

    render() {

        return (

            <React.Fragment>

                {(Object.keys(this.state.current_tags).length != 0 || this.state.query != "") && this.state.current_film == null ?

                    <div className="film__reset__link" onClick={this.reset}>
                        <img className="arrow__img" src="assets/img/left-arrow-button.svg" alt=""/>
                        <span href="" className="reset__link" >Назад</span>
                    </div> : null }

                {this.state.current_film == null ?
                    <div>
                        {this.state.current_tab == "films" ?
                                <div className="container">
                                    <Search change={this.onInputChange} />
                                    <div className="films__tags">
                                        {Object.keys(this.state.current_tags).map((tag, tag_index) =>
                                            <span className="current__tags" key={tag_index}>#{tag}</span>
                                        )}
                                    </div>
                                </div> : null}

                        <div className="header">
                            <div className="container">
                                <div className="header__inner">
                                    <div className={this.state.current_tab == "films" ? "films header__link active" : "films header__link"}
                                         data-info="films" onClick={this.onChangeTab}>
                                        <a className="films__link" href="#" data-info="films" onClick={this.onChangeTab}>Фильмы</a>
                                    </div>

                                    <div className={this.state.current_tab == "bookmarks" ? "bookmarks header__link active" :
                                        "bookmarks header__link"} data-info="bookmarks" onClick={this.onChangeTab}>
                                        <a className="bookmarks__link" href="#" data-info="bookmarks" onClick={this.onChangeTab}>Закладки</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="content">
                            <div className="container">
                                {(Object.keys(this.state.current_tags).length != 0 || this.state.query != "") && this.state.current_tab == "films" ? <h3 className="results__title">Результаты поиска</h3> : null }

                                {this.state.current_tab == "films" ? <Films
                                        setFilm={this.setFilm}
                                        bookmarks={this.state.bookmarks}
                                        items={this.state.filteredItems}
                                        title={this.state.item}
                                        current_tags={this.state.current_tags}
                                        onFilterTags={this.onFilterTags}
                                        ClickStar={this.onAddBookmarks}/> :
                                    <Bookmarks bookmarks={this.state.bookmarks} items={this.state.filteredItems} title={this.state.item}
                                               ClickStar={this.onAddBookmarks} />}
                            </div>
                        </div>
                    </div>
                    : <FilmCard reset={this.resetCurrentFilm}
                                bookmarks={this.state.bookmarks}
                                film={this.state.current_film}
                                delBookmark={this.onAddBookmarks}
                                addedBookmark={this.onAddBookmarks} /> }

            </React.Fragment>
        );
    }
}

export default App;

