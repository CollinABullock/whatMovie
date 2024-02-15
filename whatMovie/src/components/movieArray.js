const moviesArray = [
  [{"item": "1", "title": "John Wick", "runtime": "101", "description": "When a gangster's son steals his car and kills his dog, fearless ex-assassin John Wick takes on the entire mob to get his revenge.", "genre": ["Film Nour", "Action", "Adventure", "Violent", "Gritty"], "mpaa": "R", "poster": "https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/rkETp35xJVj-6WaffQsS77awykM/AAAABd82SjUzYAkpfT3wMv9DPApULQDaJGDEwZSDRkGP3x4UUk_66soLbnz9JGctOeact-aS1owjJoWYh73XU3nkO9KbNYnRpF4y14bv.jpg?r=dc8", "actors": [{"name": "Keanu Reeves", "image": "https://www.rollingstone.com/wp-content/uploads/2023/05/GettyImages-1493917424-2.jpg?w=1024", "imdb": "https://www.imdb.com/name/nm0000206/"}, {"name": "Michael Nyqvist", "image": "https://variety.com/wp-content/uploads/2017/06/michael-nyqvist-dead.jpg", "imdb": "https://www.imdb.com/name/nm0638824/"}, {"name": "Aflie Allen", "image": "https://static.foxnews.com/foxnews.com/content/uploads/2019/12/alfie-allen-getty.jpg"}], "link": "https://www.netflix.com/title/80013762"},

  {"item": "2", "genre": ["thriller", "action", "adventure", "violent", "suspenseful"], "title": "The Equalizer 3", "release-year": "2023", "runtime": "119", "mpaa": "R", "description": "Robert McCall vows to stop an Italian crime syndicate from brutalizing and extorting the residents of a small coastal town that has won his heart.", "poster": "https://occ-0-7091-92.1.nflxso.net/dnm/api/v6/rkETp35xJVj-6WaffQsS77awykM/AAAABXigXUjgvpYUaCNtoSXvdJ3MSjIQMsiHrJByYBdUvmVpW-s6Rc4lKY7VzVabpqAnXrG16_Scp9swRqGC_EO4cOV45udZ2H0sx1Q.jpg?r=653", "actors": [{"name": "Denzel Washington", "image": "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2022%2F01%2Fdenzel-washington-the-equalizer-3-currently-in-the-works-confirmed-001.jpg?cbr=1&q=90", "imdb": "https://www.imdb.com/name/nm0000243/"}, {"name": "Dakota Fanning", "image": "https://www.etonline.com/sites/default/files/images/2016-03/1280_dakota_fanning_160309_514299728.jpg", "imdb": "https://www.imdb.com/name/nm0266824/"}], "link": "https://www.netflix.com/title/81674658"},

  {"item": "3", "title": "American Assassin", "runtime": "111", "description": "After grad student Mitch Rapp suffers a tragic loss during a terrorist attack, his single-minded thirst for vengeance catches the interest of the CIA.", "genre": ["action", "violent", "exciting"], "poster": "https://occ-0-7091-92.1.nflxso.net/dnm/api/v6/rkETp35xJVj-6WaffQsS77awykM/AAAABY3VqF_GQGCsH-rAC80jWpzSVJLq18ftK7H40hBgzSy2r8uLDP8qbR19oDz5-rxCq93cunozLRJd2ZeLLoL5Qz70ZsE_vsHnNaSlJyl9bM9ca68UnkRnnq16clBTmspIUIMeWZnlym26SrHxcCrsL5VGtIm8VbInOdE.jpg?r=8df", "actors": [{"name": "Dylan O'Brien", "image": "https://variety.com/wp-content/uploads/2022/03/Dylan-OBrien.jpg?w=1000", "imdb": "https://www.imdb.com/name/nm3729721/"}, {"name": "Michael Keaton", "image": "https://media.vanityfair.com/photos/62e92ee5e157986bb4f403e4/master/w_2560%2Cc_limit/1402978977", "imdb": "https://www.imdb.com/name/nm0000474/"}], "link": "https://www.netflix.com/title/80182951"},

  {"item": "4", "title": "Ready Player One", "poster": "https://occ-0-7091-92.1.nflxso.net/dnm/api/v6/rkETp35xJVj-6WaffQsS77awykM/AAAABYvrba6Z7rACiS5YwCgXPpkSRwFpOyrD8Eqazld4fiJBtSP2qwTMV1YdwZ5rNQNX0-wW6JZHQn9f6KvPMTxw-kyuTpXmzqUN__uk2G3Xkgq5CBNsZ3j3piye6DMkzm09immx7vMMoEUQgvCBQlpqDQ4F5l1ooPUL12U.jpg?r=9fe", "runtime": "140", "description":  "In a world on the brink of collapse, a talented gamer takes the lead in a series of challenges to win ownership of a massive virtual reality universe.", "genre": ["action", "adventure", "science-fiction"], "actors": [{"name": "Tye Sheridan", "image": "https://media.gq.com/photos/61cb80223e3e89c4022d9a9e/16:9/w_2560%2Cc_limit/1153779397", "imdb": "https://www.imdb.com/name/nm4446467/"}, {"name": "Olivia Cooke", "image": "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F013b73be-328e-11e8-b10c-795428ac06a8.jpg?crop=5449%2C3065%2C16%2C244&resize=1200", "imdb": "https://www.imdb.com/name/nm4972453/"}, {"name": "Ben Mendelsohn", "image": "https://media.gq.com/photos/65bd17467747117a19fec483/master/w_2560%2Cc_limit/ben.jpg", "imdb": "https://www.imdb.com/name/nm0578853/"}], "link": "https://www.netflix.com/title/80211726", "director": "Steven Spielberg"},

  {"item": "5", "title": "Meg 2: The Trench", "poster": "https://occ-0-7091-92.1.nflxso.net/dnm/api/v6/rkETp35xJVj-6WaffQsS77awykM/AAAABXA08yhKXmcOdp-3Fz7LCCvvkGEo7J0b-p-56FJzB4V8YvoRJrLJ9KGXDeKnIm-FnNtBeBrZa_c2zffyoOimR7b_tqVc0FGIbjA.jpg?r=cd5", "director": "Ben Wheatly"},

  {"item": "6", "title": "Rebel Moon — Part One: A Child of Fire", "poster": "https://occ-0-7091-92.1.nflxso.net/dnm/api/v6/rkETp35xJVj-6WaffQsS77awykM/AAAABTb83RN3VhDCH8tVBV5GPva_qAulKy1DQclvAOCVza7Xe_Waz-TdBZsfAZB0vWxpY9ky8jV9HGzalrnDhT8XALZjaMAa6Mp2u7GNtK9WcWeYUpVt-0HunLKKeTNFxNfVs2w_.jpg?r=7c8", "director": "Zack Synder" },

  {"item": "7", "title": "Hunter Killer", "poster": "https://occ-0-7091-92.1.nflxso.net/dnm/api/v6/rkETp35xJVj-6WaffQsS77awykM/AAAABfT9Ic9TKkum7wLhKIwz-OAQCDdLh8o91uykSzYY4uql-q9GbMLmBP6fjJhLZeZTJqmGr2eRV09gOdHqNtjQpvDav8tfCXUomvw.jpg?r=4c9", "runtime": "121", "description": "When the Russian president gets kidnapped in a coup, an American submarine captain leads a rescue mission in the hopes of avoiding all-out war.", "genre": ["action", "military", "exciting", "suspensful"], "mpaa": "R"},

  {"item": "8", "title": "Lucy", "poster": "https://occ-0-7091-92.1.nflxso.net/dnm/api/v6/rkETp35xJVj-6WaffQsS77awykM/AAAABTQyKvI3VeRem-3y8Gal7XK3zG-ZkMGkQ9Nt1kON_zJsY2keO4vEeqaEr00zZFERCUYpa1iDKMfa2rkDJ4ixsPq3s2wz-8KHJHc.jpg?r=dbf", "runtime": "89", "mpaa": "R", "genre": ["action", "science-fiction", "violent", "exciting"], "director": "Luc Besson", "link": "https://www.netflix.com/title/70307658"},

  { 
    "item": "",
    "title": "",
    "runtime": "",
    "description": "",
    "genre": "",
    "mpaa": "",
    "poster": "",
    "link": "",
    "director" [{
    "name": "",
    "image": "",
    "imdb": "",
    }],
    "actors" [{
      "name": "",
      "image": "",
      "imdb": "",
    }]
    },

    "poster": "",
    "link": "",
    "director" [{
    "name": "",
    "image": "",
    "imdb": "",
    }],
    "actors" [{
      "name": "",
      "image": "",
      "imdb": "",
    }]
    },

    

]
]

const netflixArray = moviesArray[0];

export {moviesArray, netflixArray}