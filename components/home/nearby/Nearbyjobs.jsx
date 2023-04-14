import { View, Text, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
// import { PulseIndicator } from 'react-native-indicators';
import { useRouter } from 'expo-router';
import { COLORS } from '../../../constants';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import useFetch from '../../../hook/useFetch';

import styles from './nearbyjobs.style'
import { useCallback, useState } from 'react';

const Nearbyjobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch(
    'search', {
      query: 'React developer',
      num_pages: 1
    }
  )
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Your refreshing logic here
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary}/>
        ) 
        : error ? (
          <Text>Something went worng</Text>
          
        )
         : (
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          ))
        )}
      </View>
    </View>
  )
}

export default Nearbyjobs;


