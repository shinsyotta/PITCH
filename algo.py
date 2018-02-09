import sys

threshold = 5
sold = 3
prices = [10, 20, 30, 40, 50]
amount = int(sys.argv[1])


def calculate_purchase(amount, sold, threshold, prices):
    # get our index in the prices array
    index = sold / threshold

    # if we've exceeded the prices array length it means
    # we're trying to sell too many tokens, blow up
    if index >= len(prices):
        raise Exception("NOPE")

    # get the current price
    current_price = prices[index]

    # figure out how many tokens this transaction is attempting to purchase
    want = amount / current_price

    # figure out how many tokens in the current round we have to sell
    available = threshold - (sold % threshold)
    print (current_price, available)

    # if the transaction is trying to buy more than we have available
    # we have to sell what we have at the current price and work on
    # the remainder within the next round's pricing
    if want > available:
        # figure out how much was spent in the current round
        spent = available * current_price

        # return the tokens available in this round plus what was 
        # sold at higher prices
        return available + calculate_purchase(amount - spent, sold + available, threshold, prices)

    # everything they wanted to buy fit in the current
    # round so just return the count of tokens they wanted
    return want

print calculate_purchase(amount, sold, threshold, prices)
