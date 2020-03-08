package edu.sjsu.cmpe275.aop.tweet;

import java.lang.reflect.Array;
import java.util.*;

public class TweetStatsServiceImpl implements TweetStatsService {
  /***
   * Following is a dummy implementation.
   * You are expected to provide an actual implementation based on the requirements.
   */

  public Map<String, Set<String>> follow;
  public Map<String, Set<String>> block;
  public Map<String, Set<String>> tweet;
  public Map<String, Integer> missed;
  public Map<String, Integer> activity;


  public TweetStatsServiceImpl() {
    follow = new HashMap<String, Set<String>>();
    block = new HashMap<String, Set<String>>();
    tweet = new HashMap<String, Set<String>>();
    missed = new HashMap<String, Integer>();
    activity = new HashMap<String, Integer>();
  }

  @Override
  public void resetStatsAndSystem() {
    // TODO Auto-generated method stub
    follow = new HashMap<String, Set<String>>();
    block = new HashMap<String, Set<String>>();
    tweet = new HashMap<String, Set<String>>();
    missed = new HashMap<String, Integer>();
    activity = new HashMap<String, Integer>();
  }

  @Override
  public int getLengthOfLongestTweet() {

    int maxLength = Integer.MIN_VALUE;

    for(String s: tweet.keySet()) {
      maxLength = Math.max(maxLength, s.length());
    }

    if(maxLength < 0)
      return 0;
    else
      return maxLength;
  }

  @Override
  public String getMostFollowedUser() {

    if(follow.size() == 0)
      return null;

    int maxFollowing = Integer.MIN_VALUE;
    String mostFollowed = null;

    for(String s: follow.keySet()) {
      if(follow.get(s).size() > maxFollowing) {
        maxFollowing = follow.get(s).size();
        mostFollowed = s;
      } else if(follow.get(s).size() == maxFollowing) {
        if(s.compareTo(mostFollowed) < 0) {
          mostFollowed = s;
        }
      } else {

      }
    }

    return mostFollowed;
  }

  @Override
  public String getMostPopularMessage() {

    if(tweet.size() == 0)
      return null;

    int popularMessageReach = Integer.MIN_VALUE;
    String popularMessage = null;

    for(String s: tweet.keySet()) {
      if(tweet.get(s).size() > popularMessageReach) {
        popularMessageReach = tweet.get(s).size();
        popularMessage = s;
      } else if(tweet.get(s).size() == popularMessageReach) {
        if(s.compareTo(popularMessage) < 0) {
          popularMessage = s;
        }
      } else {

      }
    }

    return popularMessage;
  }

  @Override
  public String getMostProductiveUser() {

    if(activity.size() == 0)
      return null;

    int mostProductiveUserLength = Integer.MIN_VALUE;
    String mostProductiveUser = null;

    for(String s: activity.keySet()) {
      if(activity.get(s) > mostProductiveUserLength) {
        mostProductiveUserLength = activity.get(s);
        mostProductiveUser = s;
      } else if(activity.get(s) == mostProductiveUserLength) {
        if(s.compareTo(mostProductiveUser) < 0)
          mostProductiveUser = s;
      } else {

      }
    }

    return mostProductiveUser;
  }

  @Override
  public String getMostBlockedFollowerByNumberOfMissedTweets() {

    if(missed.size() == 0)
      return null;

    int mostBlockedFollowerByNumberOfMissedTweetsCount = Integer.MIN_VALUE;
    String mostBlockedFollowerByNumberOfMissedTweets = null;

    for(String s: missed.keySet()) {
      if(missed.get(s) > mostBlockedFollowerByNumberOfMissedTweetsCount) {
        mostBlockedFollowerByNumberOfMissedTweets = s;
        mostBlockedFollowerByNumberOfMissedTweetsCount = missed.get(s);
      } else if(missed.get(s) == mostBlockedFollowerByNumberOfMissedTweetsCount) {
        if(s.compareTo(mostBlockedFollowerByNumberOfMissedTweets) < 0)
          mostBlockedFollowerByNumberOfMissedTweets = s;
      } else {

      }
    }

    return mostBlockedFollowerByNumberOfMissedTweets;
  }

  @Override
  public String getMostBlockedFollowerByNumberOfFollowees() {

    if(block.size() == 0 || follow.size() == 0)
      return null;

    int mostBlockedFollowerByNumberOfFolloweesCount = Integer.MIN_VALUE;
    String mostBlockedFollowerByNumberOfFollowees = null;

    Map<String, Integer> map = new HashMap<String, Integer>();

    for(String followee : follow.keySet()) {
      for(String follower : follow.get(followee)) {
        if(block.containsKey(followee)) {
          if(block.get(followee).contains(follower)) {
            if(map.containsKey(follower)) {
              map.put(follower, map.get(follower) + 1);
            } else {
              map.put(follower, 1);
            }
          } else {

          }
        } else {

        }
      }
    }

    for(String s: map.keySet()) {
      if(map.get(s) > mostBlockedFollowerByNumberOfFolloweesCount) {
        mostBlockedFollowerByNumberOfFollowees = s;
        mostBlockedFollowerByNumberOfFolloweesCount = map.get(s);
      } else if(map.get(s) == mostBlockedFollowerByNumberOfFolloweesCount) {
        if(s.compareTo(mostBlockedFollowerByNumberOfFollowees) < 0)
          mostBlockedFollowerByNumberOfFollowees = s;
      } else {

      }
    }
    return mostBlockedFollowerByNumberOfFollowees;
  }
}



