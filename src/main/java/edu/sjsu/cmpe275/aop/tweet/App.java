package edu.sjsu.cmpe275.aop.tweet;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class App {
  public static void main(String[] args) {
    /***
     * Following is a dummy implementation of App to demonstrate bean creation with Application context.
     * You may make changes to suit your need, but this file is NOT part of the submission.
     */

    ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext("context.xml");
    TweetService tweeter = (TweetService) ctx.getBean("tweetService");
    TweetStatsService stats = (TweetStatsService) ctx.getBean("tweetStatsService");

    try {
      tweeter.follow("bob", "alex");
      System.out.println("------------------------");
      tweeter.follow("bob", "ali");
      System.out.println("------------------------");
      tweeter.follow("aswin", "ali");
      System.out.println("------------------------");
      tweeter.follow("alex", "bob");
      System.out.println("------------------------");
      tweeter.tweet("bob", "first tweet");
      tweeter.block("alex", "bob");
      System.out.println("------------------------");
      tweeter.tweet("bob", "second tweet");
      System.out.println("------------------------");
      tweeter.unblock("alex", "bob");
      System.out.println("------------------------");
      tweeter.tweet("bob", "third tweet");
    } catch (Exception e) {
      e.printStackTrace();
    }

    System.out.println("Most productive user: " + stats.getMostProductiveUser());
    System.out.println("Most popular user: " + stats.getMostFollowedUser());
    System.out.println("Length of the longest tweet: " + stats.getLengthOfLongestTweet());
    System.out.println("Most popular message: " + stats.getMostPopularMessage());
    ctx.close();
  }
}
