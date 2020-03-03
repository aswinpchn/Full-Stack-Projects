package edu.sjsu.cmpe275.aop.tweet.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;

import edu.sjsu.cmpe275.aop.tweet.TweetStatsServiceImpl;

import java.util.HashSet;
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
  public void dummyAfterAdvice(JoinPoint joinPoint) {
    System.out.printf("After the execution of the method %s in StatsAspect\n", joinPoint.getSignature().getName());
    //stats.resetStats();
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
      } else {
        throw new UnsupportedOperationException();
      }
    }
  }

}
