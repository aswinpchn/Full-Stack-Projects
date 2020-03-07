package edu.sjsu.cmpe275.aop.tweet.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;

import edu.sjsu.cmpe275.aop.tweet.TweetStatsServiceImpl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Aspect
@Order(0)
public class StatsAspect {
  /***
   * Following is a dummy implementation of this aspect.
   * You are expected to provide an actual implementation based on the requirements, including adding/removing advices as needed.
   */

  @Autowired
  TweetStatsServiceImpl stats;

  @AfterReturning("execution(public * edu.sjsu.cmpe275.aop.tweet.TweetService.tweet(..))")
  public void tweetAdvice(JoinPoint joinPoint) {
    System.out.printf("After the execution of the method %s in StatsAspect\n", joinPoint.getSignature().getName());

    String tweeter = joinPoint.getArgs()[0].toString();
    String message = joinPoint.getArgs()[1].toString();
    Set<String> reachList = new HashSet<String>();

    if(stats.follow.containsKey(tweeter)) {
      Set<String> followers = stats.follow.get(tweeter);
      if(followers.size() == 0) {

      } else {
        for(String s: followers) {
          if(stats.block.get(tweeter) != null) {
            if(stats.block.get(tweeter).contains(s)) {

            } else {
              reachList.add(s);
            }
          } else {
            reachList.add(s);
          }
        }
      }
    } else {

    }

    if(stats.tweet.containsKey(message)) {
      stats.tweet.get(message).addAll(reachList);
    } else {
      stats.tweet.put(message, reachList);
    }

    Set<String> followers = stats.follow.get(tweeter);
    for(String s: followers) {
      if(stats.block.get(tweeter) != null) {
        if(stats.block.get(tweeter).contains(s)) {
          if(stats.missed.containsKey(s)) {
            stats.missed.put(s, stats.missed.get(s) + 1);
          } else {
            stats.missed.put(s, 1);
          }
        } else {

        }
      } else {

      }
    }

    if(stats.activity.containsKey(tweeter)) {
      stats.activity.put(tweeter, stats.activity.get(tweeter) + message.length());
    } else {
      stats.activity.put(tweeter, message.length());
    }

  }

  @AfterReturning("execution(public * edu.sjsu.cmpe275.aop.tweet.TweetService.block(..))")
  public void blockAdvice(JoinPoint joinPoint) {
    System.out.printf("After the execution of the method %s in StatsAspect\n", joinPoint.getSignature().getName());

    String userToBeBlocked = joinPoint.getArgs()[0].toString();
    String userWhoIsBlocking = joinPoint.getArgs()[1].toString();

    if(stats.block.get(userWhoIsBlocking) == null) {
      Set<String> temp = new HashSet<String>();
      temp.add(userToBeBlocked);
      stats.block.put(userWhoIsBlocking, temp);
    } else {
      stats.block.get(userWhoIsBlocking).add(userToBeBlocked);
    }
  }

  @AfterReturning("execution(public * edu.sjsu.cmpe275.aop.tweet.TweetService.unblock(..))")
  public void unblockAdvice(JoinPoint joinPoint) {
    System.out.printf("After the execution of the method %s in StatsAspect\n", joinPoint.getSignature().getName());

    String userToBeBlocked = joinPoint.getArgs()[0].toString();
    String userWhoIsBlocking = joinPoint.getArgs()[1].toString();

    if(stats.block.get(userWhoIsBlocking) == null) {

    } else {
      if(stats.block.get(userWhoIsBlocking).contains(userToBeBlocked)) {
        stats.block.get(userWhoIsBlocking).remove(userToBeBlocked);
        if(stats.block.get(userWhoIsBlocking).size() == 0)
          stats.block.remove(userWhoIsBlocking);
      } else {
        throw new UnsupportedOperationException();
      }
    }
  }

  @AfterReturning("execution(public * edu.sjsu.cmpe275.aop.tweet.TweetService.follow(..))")
  public void followAdvice(JoinPoint joinPoint) {
    System.out.printf("After the execution of the method %s in StatsAspect\n", joinPoint.getSignature().getName());

    String follower = joinPoint.getArgs()[0].toString();
    String followee = joinPoint.getArgs()[1].toString();

    if(stats.follow.get(followee) == null) {
      Set<String> temp = new HashSet<String>();
      temp.add(follower);
      stats.follow.put(followee, temp);
    } else {
      stats.follow.get(followee).add(follower);
    }
  }

}
