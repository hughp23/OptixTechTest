using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Schema;

namespace TestReactServerApp.Controllers
{
    [Route("api/CardData")]
    public class CardData : Controller
    {
        private static string[] Suits = new[]
        {
            "Spades", "Hearts", "Diamonds", "Clubs"
        };

        public List<Cards> GetCards()
        {
            List<Cards> cardsList = new List<Cards>();
            for (var i = 1; i < 14; i++)
            {
                for (var j = 0; j < Suits.Length; j++)
                {
                    Cards card = new Cards()
                    {
                        Value = i,
                        Suit = Suits[j]
                    };
                    cardsList.Add(card);
                }
            }
            return cardsList;
        }

        [HttpGet("ShuffleCards")]
        public List<Cards> ShuffleCards(string dealtCards)
        {
            try
            {
                Random random = new Random();
                List<Cards> allCards = GetCards();
                List<Cards> dealtCardsList = new List<Cards>();
                dealtCardsList = JsonConvert.DeserializeObject<List<Cards>>(dealtCards);

                //remove already dealt cards
                IEnumerable<Cards> newCards = allCards.Where(x => !dealtCardsList.Any(y => y.Suit == x.Suit && y.Value == x.Value));

                return newCards.OrderBy(x => random.Next()).ToList();
            }
            catch (Exception Ex)
            {
                return null;
            }
        }

        public class Cards
        {
            public string Suit { get; set; }
            public int Value { get; set; }
        }
    }
}
