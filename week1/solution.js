[
  {
    '$geoNear': {
      'distanceField': 'foo', 
      'near': {
        'type': 'Point', 
        'coordinates': [
          166.6863, -77.8419
        ]
      }, 
      'maxDistance': 1000000, 
      'limit': 50000
    }
  }, {
    '$bucket': {
      'groupBy': {
        '$year': {
          '$dateFromString': {
            'dateString': '$year'
          }
        }
      }, 
      'boundaries': [
        1970, 1980, 1990, 2000, 2010, 2020
      ], 
      'output': {
        'stdDeviation': {
          '$stdDevPop': '$mass'
        }, 
        'average': {
          '$avg': '$mass'
        }
      }, 
      'default': 'foo'
    }
  }, {
    '$group': {
      '_id': null, 
      'decades': {
        '$push': {
          'decade': '$_id', 
          'stdDeviation': '$stdDeviation', 
          'average': '$average'
        }
      }
    }
  }, {
    '$project': {
      '_id': 0
    }
  }
]


