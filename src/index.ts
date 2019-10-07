import "reflect-metadata";
import {createConnections, Connection, ConnectionOptions} from "typeorm";
import { UserRepository } from './repository/UserRepository';
import { config} from "./config/config";
import { IConfigDB, TYPE_MONGODB, TYPE_SQL, OPERATIVO } from "./config/connectionString";
import cheerio = require('cheerio');

console.log("iniciado servidor..")
const axios = require('axios');
const url = 'https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1';

// axios(url)
//   .then(response => {
//     const html = response.data;
//     const $ = cheerio.load(html);
//     const statsTable = $('.statsTableContainer > tr');
//     console.log(statsTable.length);

//     const topPremierLeagueScorers = [];

//     statsTable.each(function () {
//         const rank = $(this).find('.rank > strong').text();
//         const playerName = $(this).find('.playerName > strong').text();
//         const nationality = $(this).find('.playerCountry').text();
//         const goals = $(this).find('.mainStat').text();

//         topPremierLeagueScorers.push({
//             rank,
//             name: playerName,
//             nationality,
//             goals,
//         });
//     });

//     console.log(topPremierLeagueScorers);
//   })
//   .catch(console.error);

    const getAllAttributes = function (node) {
        return node.attributes || node.map(node.attribs,(value,name) => {
            return { name,value };
        });
    };
  function retrievePopularToday(){
      let url = "https://www.pesmaster.com/";
      axios(url)
      .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const listPlayers = $('.player-card-container');
        const topPlayers = [];

        listPlayers.each(function () {
            const playerCard = $(this).find('.player-card');
            let atributos = []
            let style = playerCard.attr('style');

            let dataURL = $(playerCard).css('background-image')
            playerCard.each(function(){
                const ovr = $(this).find('.player-card-ovr').text();
                const position = $(this).find('.player-card-position').text();
                const playerName = $(this).find('.player-card-name').text();
                let urlTeamLogo = null;
                $(this).find('.player-card-teamlogo').each( function () {
                    urlTeamLogo = $(this).attr('src');
                });
                let urlImagePlayer = null;
                $(this).find('.player-card-image').each( function () {
                    urlImagePlayer = $(this).attr('src');
                });
                let urlPlayer = $(this).find('a').attr('href');
                topPlayers.push({
                    ovr,
                    position,
                    playerName,
                    urlTeamLogo,
                    urlImagePlayer,
                    urlPlayer
                });
            })
        });
        console.log(topPlayers);
      })
      .catch(console.error);
  }

  retrievePopularToday();