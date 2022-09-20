import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: '100%',
    width: '100%',
  },
  searchContainer: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 6,
    alignSelf: 'center',
    paddingTop: '10%',
  },
  input: {
    fontSize: 15,
    borderColor: '#8888',
    marginTop: 10,
    marginLeft: 25,
  },
  button: {
    backgroundColor: '#AFEEEE',
    paddingVertical: 12,
    borderRadius: 4,
    marginHorizontal: 37,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 14,
    color: 'blue',
  },
  labelStyle: {
    marginLeft: 12,
    marginTop: 5,
    color: 'black',
    marginBottom: 5,
    fontSize: 14,
    fontWeight: '500',
  },
  direction: {
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#8888',
    marginTop: 10,
    marginHorizontal: '9%',
  },
  searchBar: {
    position: 'absolute',
    width: '92%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: '15%',
    zIndex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  searchBarPin: {
    height: 30,
    width: 30,
    alignSelf: 'center',
  },
  directionView: {
    position: 'absolute',
    top: '80%',
    right: 10,
    backgroundColor: '#093de8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: '7%',
    width: '15%',
  },
  icon: {
    height: 30,
    width: 30,
    tintColor: 'white',
  },
  AutocompleteView: {
    flexDirection: 'row',
    width: '99%',
  },
  AutocomleteIcon: {
    height: 25,
    width: 25,
    position: 'absolute',
    marginTop: 20,
  },
  distanceView: {
    left: '6%',
    top: '5%',
  },
  TimeAndDistance: {
    fontWeight: '200',
    fontSize: 25,
    paddingBottom: '4%',
  },
  quote: {
    fontWeight: '300',
    fontSize: 15,
  },
});
