// client id: oWDzbX3E9cb8bGdoeo0OPQ
// api key: ps45ujE7mYQed7H_66clWRipLYHNld5XYS2REC76y5kk-rBkKYIDh3-QRe1J6-Fxmhx8ApI_DwgwGyG8zVnbJfPyR_8btJ0e6LaGU-Yyia-dY1i6egjhf5b6Up-mWnYx

const apiKey = 'ps45ujE7mYQed7H_66clWRipLYHNld5XYS2REC76y5kk-rBkKYIDh3-QRe1J6-Fxmhx8ApI_DwgwGyG8zVnbJfPyR_8btJ0e6LaGU-Yyia-dY1i6egjhf5b6Up-mWnYx'
const corsAnywhere = 'https://cors-anywhere.herokuapp.com/'
const searchEndpoint = 'https://api.yelp.com/v3/businesses/search'

const Yelp = {
  search: function(term, location, sortBy) {
    return fetch(
      corsAnywhere
      + searchEndpoint
      + `?term=${term}&location=${location}&sort_by=${sortBy}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      }
    ).then(response => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Request failed!')
    }, networkError => console.log(networkError.message)
  ).then(jsonResponse => {
    console.log('RESPONSE HERE ::::::::')
    console.log(jsonResponse)
    if (jsonResponse.businesses) {
      return jsonResponse.businesses.map(business => { return {
        id: business.id,
        imageSrc: business.image_url,
        name: business.name,
        address: business.location.address1,
        city: business.location.city,
        state: business.location.state,
        zipCode: business.location.zip_code,
        category: business.categories.reduce(
          (string, category) => {
            return string + ' ' + category.title 
          }, ''
        ),
        rating: business.rating,
        reviewCount: business.review_count
      }})
    } else {
      console.log('Search yielded no businesses.')
    }
  })
  }
}

export default Yelp
