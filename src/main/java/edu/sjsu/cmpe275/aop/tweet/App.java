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

      /*

      tweeter.follow("bob", "alex");
      System.out.println("------------------------");
      tweeter.follow("bob", "ali");
      System.out.println("------------------------");
      tweeter.block("bob", "alex");
      System.out.println("------------------------");
      tweeter.block("bob", "ali");
      System.out.println("------------------------");
      tweeter.follow("aswin", "ali");
      System.out.println("------------------------");
      tweeter.follow("alex", "bob");
      System.out.println("------------------------");
      tweeter.follow("ain", "bob");
      System.out.println("------------------------");
      tweeter.tweet("bob", "first tweet");
      System.out.println("------------------------");
      tweeter.block("alex", "bob");
      System.out.println("------------------------");
      tweeter.block("ain", "bob");
      System.out.println("------------------------");
      tweeter.tweet("bob", "second tweet");
      System.out.println("------------------------");
//      tweeter.unblock("alex", "bob");
//      System.out.println("------------------------");
      tweeter.tweet("bob", "third tweet");
      System.out.println("------------------------");
      tweeter.tweet("bob", "third tweet");
      System.out.println("------------------------");

       */

      tweeter.follow("Carol", "Alex");
      tweeter.follow("Carol", "Bob");
      tweeter.follow("Daisy", "Bob");

      tweeter.tweet("Alex", "AlexHello");
      tweeter.tweet("Bob", "BobHello");
      tweeter.tweet("Alex", "Hello");
      tweeter.tweet("Bob", "  Hello  ");

      tweeter.block("Bob", "Carol");
      tweeter.tweet("Alex", "AlexMessage");
      tweeter.tweet("Bob", "BobMessage");
      tweeter.follow("X", "A");
      tweeter.follow("Y", "A");
      tweeter.follow("Z", "A");
      tweeter.tweet("A", "A Tweet");

      tweeter.unblock("Bob", "Carol");
      tweeter.tweet("Bob", "Bob After Unblocking");

      tweeter.tweet("  A  ", "Hello");

      tweeter.tweet(" A ", "hello");

      stats.resetStatsAndSystem();
      tweeter.follow("Carol", "Alex");
      tweeter.follow("Carol", "Bob");
      tweeter.follow("Daisy", "Bob");

      tweeter.tweet("Alex", "AlexHello");
      tweeter.tweet("Bob", "BobHello");
      tweeter.tweet("Alex", "Hello");
      tweeter.tweet("Bob", "  Hello  ");

      tweeter.block("Carol", "Bob");
      tweeter.tweet("Alex", "AlexMessage");
      tweeter.tweet("Bob", "BobMessage");
      tweeter.follow("X", "A");
      tweeter.follow("Y", "A");
      tweeter.follow("Z", "A");
      tweeter.tweet("A", "A Tweet");

      tweeter.unblock("Carol", "Bob");
      tweeter.tweet("Bob", "Bob After Unblocking");

      tweeter.tweet("  A  ", "Hello");

      tweeter.tweet(" A ", "hello");
      tweeter.block("Carol", "Bob");
    } catch (Exception e) {
      e.printStackTrace();
    }

    System.out.println("Most productive user: " + stats.getMostProductiveUser());
    System.out.println("Most popular user: " + stats.getMostFollowedUser());
    System.out.println("Length of the longest tweet: " + stats.getLengthOfLongestTweet());
    System.out.println("Most popular message: " + stats.getMostPopularMessage());
    System.out.println("getMostBlockedFollowerByNumberOfMissedTweets: " + stats.getMostBlockedFollowerByNumberOfMissedTweets());
    System.out.println("getMostBlockedFollowerByNumberOfFollowees: " + stats.getMostBlockedFollowerByNumberOfFollowees());
    ctx.close();
  }
}
