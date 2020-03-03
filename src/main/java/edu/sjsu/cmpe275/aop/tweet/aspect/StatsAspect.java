package edu.sjsu.cmpe275.aop.tweet.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;

import edu.sjsu.cmpe275.aop.tweet.TweetStatsServiceImpl;

@Aspect
@Order(0)
public class StatsAspect {
  /***
   * Following is a dummy implementation of this aspect.
   * You are expected to provide an actual implementation based on the requirements, including adding/removing advices as needed.
   */

  @Autowired TweetStatsServiceImpl stats;

  @AfterReturning("execution(public * edu.sjsu.cmpe275.aop.tweet.TweetService.tweet(..))")
  public void dummyAfterAdvice(JoinPoint joinPoint) {
    System.out.printf("After the execution of the method %s in StatsAspect\n", joinPoint.getSignature().getName());
    //stats.resetStats();
  }

}
