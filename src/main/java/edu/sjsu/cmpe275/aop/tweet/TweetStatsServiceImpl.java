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
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public String getMostBlockedFollowerByNumberOfMissedTweets() {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public String getMostBlockedFollowerByNumberOfFollowees() {
    // TODO Auto-generated method stub
    return null;
  }
}



