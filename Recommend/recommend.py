from joblib import load
import pandas as pd
def recommend_product(survey):
    new_data = {
    'product_category': ['Coffee'],
    'month': ['June'],
    'day': ['Monday'],
    'caffeine_content': ['High'],
    'acidity': [5],
    'bitterness': [3],
    'sweetness': [2],
    'Period': ['Morning']
    }
    model = load('pipeline.pkl')
    new_df = pd.DataFrame(new_data)
    new_pred = model.predict(new_df)
    return {'product': new_pred[0]}
    # feature_data = {
    #     'product_type': ['Gourmet brewed coffee', 'Brewed Chai tea', 'Hot chocolate', 'Drip coffee',
    #                      'Barista Espresso', 'Brewed Black tea', 'Brewed Green tea',
    #                      'Brewed herbal tea', 'Organic brewed coffee', 'Premium brewed coffee'],
    #     'acidity': [5, 3, 1, 3, 4, 3, 3, 2, 4, 4],
    #     'bitterness': [4, 2, 1, 4, 5, 3, 3, 1, 4, 4],
    #     'sweetness': [1, 2, 5, 1, 1, 1, 1, 1, 1, 1],
    #     'caffeine_content': ['High', 'Medium', 'None', 'High', 'High', 'Medium', 'Medium', 'None', 'High', 'High']
    # }

    # distributions = {
    #     'acidity': {0: 22796, 1: 11468, 2: 11245, 3: 42681, 4: 33027, 5: 16912},
    #     'bitterness': {0: 22796, 1: 22796, 2: 17183, 3: 17021, 4: 42013, 5: 16403},
    #     'sweetness': {1: 86682, 2: 17183, 3: 15884, 4: 6912, 5: 11468}
    # }

    # weights = {
    #     'caffeine_content': 4,
    #     'sweetness': 3,
    #     'bitterness': 2,
    #     'acidity': 1
    # }

    # best_match = None
    # best_score = float('-inf')

    # for i in range(len(feature_data['product_type'])):
    #     score = 0

    #     if feature_data['caffeine_content'][i] == survey['caffeine_content']:
    #         score += weights['caffeine_content'] * 1

    #     sweetness_diff = abs(feature_data['sweetness'][i] - survey['sweetness'])
    #     bitterness_diff = abs(feature_data['bitterness'][i] - survey['bitterness'])
    #     acidity_diff = abs(feature_data['acidity'][i] - survey['acidity'])

    #     score += weights['sweetness'] * (1 - sweetness_diff / distributions['sweetness'][survey['sweetness']])
    #     score += weights['bitterness'] * (1 - bitterness_diff / distributions['bitterness'][survey['bitterness']])
    #     score += weights['acidity'] * (1 - acidity_diff / distributions['acidity'][survey['acidity']])

    #     if score > best_score:
    #         best_score = score
    #         best_match = feature_data['product_type'][i]

    # return {'product': best_match}
