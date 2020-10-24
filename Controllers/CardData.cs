using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

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
            for (var i = 1; i < 13; i++)
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
        public IEnumerable<Cards> ShuffleCards(List<Cards> dealtCards)
        {
            Random random = new Random();
            List<Cards> allCards = GetCards();

            //remove already dealt cards
            allCards.RemoveAll(x => dealtCards.Contains(x));

            return allCards.OrderBy(x => random.Next()).AsEnumerable();
        }

        public class Cards
        {
            public int Value { get; set; }
            public string Suit { get; set; }
        }
    }
}
