package edu.sjsu.cmpe275.aop.tweet;

import java.lang.reflect.Array;
import java.util.*;

public class TweetStatsServiceImpl implements TweetStatsService {
  /***
   * Following is a dummy implementation.
   * You are expected to provide an actual implementation based on the requirements.
   */

  public Map<String, String> follow;
  public Map<String, Set<String>> block;
  public List<List<String>> tweet;
  public Map<String, String> missed;

  public TweetStatsServiceImpl() {
    follow = new HashMap<String, String>();
    block = new HashMap<String, Set<String>>();
    tweet = new ArrayList<List<String>>();
    missed = new HashMap<String, String>();
  }

  @Override
  public void resetStatsAndSystem() {
    // TODO Auto-generated method stub

  }

  @Override
  public int getLengthOfLongestTweet() {
    // TODO Auto-generated method stub
    return 0;
  }

  @Override
  public String getMostFollowedUser() {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public String getMostPopularMessage() {
    // TODO Auto-generated method stub
    return null;
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



