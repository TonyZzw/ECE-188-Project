from joblib import load
import pandas as pd
from datetime import datetime
def categorize_time(t):
    if 6 <= t.hour < 9:
        return 'Morning'
    elif 9 <= t.hour < 12:
        return 'Late Morning'
    elif 12 <= t.hour < 15:
        return 'Noon'
    elif 15 <= t.hour < 18:
        return 'Afternoon'
    elif 18 <= t.hour < 21:
        return 'Evening'
    else:
        return 'Night'
def recommend_product(survey):
    current_time = datetime.now()
    month_name = current_time.strftime("%B")
    day_name = current_time.strftime("%A")
    period = categorize_time(current_time)
    
    new_data = {
    'product_category': [survey['type']],
    'month': [month_name],
    'day': [day_name ],
    'caffeine_content': [survey['caffeine_content']],
    'acidity': [survey['acidity']],
    'bitterness': [survey['bitterness']],
    'sweetness': [survey['sweetness']],
    'Period': [period]
    }
    model = load('pipeline.pkl')
    new_df = pd.DataFrame(new_data)
    new_pred = model.predict(new_df)
    print(new_pred[0])
    return {'product': new_pred[0]}
    
